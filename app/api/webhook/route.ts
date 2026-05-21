import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

async function getCJToken() {
  const res = await fetch('https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apiKey: process.env.CJ_API_KEY }),
  });
  const data = await res.json();
  return data.data?.accessToken;
}

async function opprettCJOrdre(session: Stripe.Checkout.Session) {
  const token = await getCJToken();
  const items = JSON.parse(session.metadata?.cj_items || '[]');
  const shipping = session.shipping_details;
  const customer = session.customer_details;

  if (!shipping || items.length === 0) {
    throw new Error('Mangler leveringsadresse eller produkter');
  }

  const body = {
    orderNumber: `NP-${session.id.slice(-12)}`,
    shippingInfo: {
      consigneeName: shipping.name,
      consigneePhone: customer?.phone || '',
      consigneeEmail: customer?.email || '',
      consigneeCountryCode: shipping.address?.country || 'NO',
      consigneePostCode: shipping.address?.postal_code || '',
      consigneeCity: shipping.address?.city || '',
      consigneeProvince: shipping.address?.state || shipping.address?.city || '',
      consigneeAddress: shipping.address?.line1 || '',
      consigneeAddressTwo: shipping.address?.line2 || '',
    },
    products: items.map((item: { vid: string; qty: number }) => ({
      vid: item.vid,
      quantity: item.qty,
    })),
  };

  const res = await fetch('https://developers.cjdropshipping.com/api2.0/v1/shopping/order/createOrderV2', {
    method: 'POST',
    headers: {
      'CJ-Access-Token': token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  return res.json();
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
      const resultat = await opprettCJOrdre(session);
      console.log('CJ-ordre opprettet:', JSON.stringify(resultat));
    } catch (err) {
      console.error('Feil ved CJ-ordre:', err);
    }
  }

  return Response.json({ mottatt: true });
}
