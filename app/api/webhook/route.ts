import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' as any });

async function getCJToken() {
  const res = await fetch('https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apiKey: process.env.CJ_API_KEY }),
  });
  const data = await res.json();
  return data.data?.accessToken;
}

async function opprettCJOrdre(sessionId: string) {
  const fullSession = await stripe.checkout.sessions.retrieve(sessionId) as any;
  const token = await getCJToken();
  const items = JSON.parse(fullSession.metadata?.cj_items || '[]');
  const shipping = fullSession.shipping_details as any;
  const customer = fullSession.customer_details as any;

  // Fallback to customer_details if shipping_details is null
  const adresse = shipping?.address || customer?.address;
  const navn = shipping?.name || customer?.name;

  console.log('DEBUG:', JSON.stringify({
    shipping: !!shipping,
    customer: !!customer,
    adresse: !!adresse,
    items,
    token: !!token,
  }));

  const gyldigeItems = items.filter((item: { vid: string; qty: number }) => item.vid);
  if (gyldigeItems.length < items.length) {
    console.warn(`Filtrerte bort ${items.length - gyldigeItems.length} produkter med manglende vid`);
  }

  if (!adresse || gyldigeItems.length === 0) {
    throw new Error('Mangler leveringsadresse eller produkter med gyldig variant-ID');
  }

  const body = {
    orderNumber: `NP-${sessionId.slice(-12)}`,
    fromCountryCode: 'CN',
    shippingCountryCode: adresse.country || 'NO',
    shippingCountry: 'Norway',
    shippingProvince: adresse.state || adresse.city || '',
    shippingCity: adresse.city || '',
    shippingZip: adresse.postal_code || '',
    shippingAddress: adresse.line1 || '',
    shippingAddress2: adresse.line2 || '',
    shippingCustomerName: navn || '',
    shippingPhone: customer?.phone || '',
    email: customer?.email || '',
    logisticName: 'PostNL',
    products: gyldigeItems.map((item: { vid: string; qty: number }) => ({
      vid: item.vid,
      quantity: item.qty,
    })),
  };

  console.log('CJ request:', JSON.stringify(body));
  const res = await fetch('https://developers.cjdropshipping.com/api2.0/v1/shopping/order/createOrderV2', {
    method: 'POST',
    headers: {
      'CJ-Access-Token': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  const cjSvar = await res.json();
  console.log('CJ svar:', JSON.stringify(cjSvar));
  return cjSvar;
}

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get('stripe-signature');

  if (!sig) {
    return Response.json({ error: 'Mangler Stripe-signatur' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return Response.json({ error: 'Ugyldig signatur' }, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    try {
      const resultat = await opprettCJOrdre(session.id);
      console.log('CJ-ordre opprettet:', JSON.stringify(resultat));
    } catch (err) {
      console.error('Feil ved CJ-ordre:', err);
    }
  }

  return Response.json({ mottatt: true });
}
