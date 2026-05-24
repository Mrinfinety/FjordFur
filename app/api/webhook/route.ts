import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' as any });

async function sendOrdreBekreftelse(session: any) {
  const customer = session.customer_details;
  if (!customer?.email) return;

  const items: { name: string; qty: number }[] = JSON.parse(session.metadata?.cj_items || '[]');
  const totalNok = (session.amount_total / 100).toFixed(0);
  const ordreNr = `NP-${session.id.slice(-12)}`;

  const raderHtml = items.map(item =>
    `<tr><td style="padding:6px 0;color:#333">${item.name}</td><td style="padding:6px 0;color:#333;text-align:right">×${item.qty}</td></tr>`
  ).join('');

  const html = `
    <div style="font-family:'DM Sans',sans-serif;max-width:520px;margin:0 auto;background:#fafaf8;padding:40px 32px;border-radius:12px">
      <h1 style="font-family:Georgia,serif;font-size:28px;color:#1a1a18;margin:0 0 8px">Takk for bestillingen! 🐾</h1>
      <p style="color:#666;font-size:14px;margin:0 0 32px">Ordrenummer: <strong>${ordreNr}</strong></p>
      <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
        ${raderHtml}
        <tr style="border-top:1px solid #e8e8e4">
          <td style="padding:12px 0;font-weight:600;color:#1a1a18">Totalt betalt</td>
          <td style="padding:12px 0;font-weight:600;color:#1a1a18;text-align:right">kr ${totalNok},–</td>
        </tr>
      </table>
      <p style="color:#666;font-size:14px;line-height:1.7">
        Pakken sendes direkte fra vårt lager og leveres innen <strong>2–3 uker</strong>.
        Du mottar sporingsinfo så snart pakken er sendt.
      </p>
      <p style="color:#888;font-size:12px;margin-top:32px">FjordFur — Premium kjæledyrutstyr</p>
    </div>
  `;

  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'FjordFur <ordre@fjordfur.com>',
      to: customer.email,
      subject: `Ordrebekreftelse ${ordreNr} — FjordFur`,
      html,
    }),
  });
}

async function getCJToken() {
  const res = await fetch('https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apiKey: process.env.CJ_API_KEY }),
  });
  const data = await res.json();
  return data.data?.accessToken;
}

async function hentLogistikkNavn(token: string, vid: string, toCountryCode: string): Promise<string> {
  try {
    const res = await fetch('https://developers.cjdropshipping.com/api2.0/v1/logistic/freightCalculate', {
      method: 'POST',
      headers: { 'CJ-Access-Token': token, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        startCountryCode: 'CN',
        endCountryCode: toCountryCode,
        products: [{ quantity: 1, vid }],
      }),
    });
    const data = await res.json();
    if (data.result && data.data?.length > 0) {
      const sorted = [...data.data].sort((a: any, b: any) => (a.freight ?? 999) - (b.freight ?? 999));
      return sorted[0].logisticName;
    }
  } catch {}
  return 'CJPacket Ordinary';
}

async function opprettCJOrdre(sessionId: string) {
  const fullSession = await stripe.checkout.sessions.retrieve(sessionId) as any;
  const token = await getCJToken();
  const items = JSON.parse(fullSession.metadata?.cj_items || '[]');
  const shipping = fullSession.shipping_details as any;
  const customer = fullSession.customer_details as any;

  const adresse = shipping?.address || customer?.address;
  const navn = shipping?.name || customer?.name;

  const gyldigeItems = items.filter((item: { vid: string; qty: number }) => item.vid);

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
    logisticName: await hentLogistikkNavn(token, gyldigeItems[0].vid, adresse.country || 'NO'),
    products: gyldigeItems.map((item: { vid: string; qty: number }) => ({
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
      await opprettCJOrdre(session.id);
    } catch (err) {
      console.error('Feil ved CJ-ordre:', err);
    }
    try {
      await sendOrdreBekreftelse(session);
    } catch (err) {
      console.error('Feil ved e-post:', err);
    }
  }

  return Response.json({ mottatt: true });
}
