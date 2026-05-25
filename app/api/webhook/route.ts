import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' as any });

async function sendOrdreBekreftelse(session: any) {
  const customer = session.customer_details;
  if (!customer?.email) return;

  const items: { name: string; qty: number }[] = JSON.parse(session.metadata?.cj_items || '[]');
  const totalNok = (session.amount_total / 100).toFixed(0);
  const ordreNr = `FF-${session.id.slice(-12)}`;
  const navn = customer.name || '';
  const shipping = (session.shipping_details as any) || customer;
  const adr = shipping?.address;
  const leveringsadresse = adr
    ? `${shipping.name || navn}<br>${adr.line1}${adr.line2 ? ', ' + adr.line2 : ''}<br>${adr.postal_code} ${adr.city}<br>${adr.country}`
    : '';

  const raderHtml = items.map(item =>
    `<tr><td style="padding:8px 0;color:#333;border-bottom:1px solid #f0f0ec">${item.name}</td><td style="padding:8px 0;color:#333;text-align:right;border-bottom:1px solid #f0f0ec">×${item.qty}</td></tr>`
  ).join('');

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e8e8e4;border-radius:8px;overflow:hidden">

      <div style="background:#1a1a18;padding:24px 32px">
        <span style="font-family:Georgia,serif;font-size:22px;color:#ffffff">Fjord<span style="color:#1D9E75">Fur</span></span>
      </div>

      <div style="padding:32px">
        <h1 style="font-family:Georgia,serif;font-size:24px;color:#1a1a18;margin:0 0 8px">Takk for bestillingen${navn ? ', ' + navn.split(' ')[0] : ''}!</h1>
        <p style="color:#666;font-size:14px;margin:0 0 28px">Ordrenummer: <strong>${ordreNr}</strong></p>

        <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
          ${raderHtml}
          <tr>
            <td style="padding:12px 0;font-weight:600;color:#1a1a18;font-size:15px">Totalt betalt</td>
            <td style="padding:12px 0;font-weight:600;color:#1a1a18;text-align:right;font-size:15px">kr ${totalNok},–</td>
          </tr>
        </table>

        ${leveringsadresse ? `
        <div style="background:#f7f7f5;border-radius:6px;padding:16px 20px;margin-bottom:24px">
          <p style="font-size:12px;color:#888;margin:0 0 6px;text-transform:uppercase;letter-spacing:0.08em">Leveringsadresse</p>
          <p style="font-size:14px;color:#333;margin:0;line-height:1.7">${leveringsadresse}</p>
        </div>` : ''}

        <div style="background:#f7f7f5;border-radius:6px;padding:16px 20px;margin-bottom:28px">
          <p style="font-size:14px;color:#444;margin:0;line-height:1.7">
            Pakken sendes direkte fra vårt lager og leveres innen <strong>2–3 uker</strong>.
            Du mottar sporingsinfo på e-post så snart pakken er sendt.
          </p>
        </div>

        <div style="border-top:1px solid #e8e8e4;padding-top:24px;margin-bottom:24px">
          <p style="font-size:14px;color:#444;margin:0 0 8px"><strong>Spørsmål?</strong> Ta kontakt med oss:</p>
          <p style="font-size:14px;color:#444;margin:0">E-post: <a href="mailto:contact.fjordfur@gmail.com" style="color:#1D9E75">contact.fjordfur@gmail.com</a></p>
          <p style="font-size:13px;color:#888;margin:6px 0 0">Vi svarer innen 1–2 virkedager.</p>
        </div>

        <div style="text-align:center;margin-bottom:28px">
          <a href="https://fjordfur.com" style="display:inline-block;background:#1a1a18;color:#ffffff;text-decoration:none;padding:11px 24px;border-radius:6px;font-size:13px;font-weight:600">Se flere produkter på fjordfur.com</a>
        </div>

        <hr style="border:none;border-top:1px solid #e8e8e4;margin:0 0 24px">

        <div style="background:#f7f7f5;border-radius:6px;padding:20px;font-size:12px;color:#555;line-height:1.8">
          <p style="margin:0 0 10px;font-weight:600;color:#333">Standardskjema for bruk av angrerett (angrerettloven vedlegg 1)</p>
          <p style="margin:0 0 6px">Til: FjordFur, contact.fjordfur@gmail.com</p>
          <p style="margin:0 0 6px">Jeg meddeler herved at jeg ønsker å benytte angreretten for kjøp av:</p>
          <p style="margin:0 0 6px">______________________________________</p>
          <p style="margin:0 0 6px">Bestilt den: _______________ &nbsp; Mottatt den: _______________</p>
          <p style="margin:0 0 6px">Navn: ______________________________________</p>
          <p style="margin:0 0 6px">Adresse: ______________________________________</p>
          <p style="margin:0 0 6px">E-postadresse: ______________________________________</p>
          <p style="margin:0 0 6px">Dato: _______________</p>
          <p style="margin:12px 0 0;color:#888;font-style:italic">Underskrift er ikke nødvendig ved innsending per e-post. Du har 14 dagers angrerett fra mottak av varen. Vi refunderer hele kjøpesummen uten at du trenger å sende varen tilbake.</p>
        </div>
      </div>

      <div style="background:#f7f7f5;padding:16px 32px;border-top:1px solid #e8e8e4;text-align:center">
        <p style="font-size:11px;color:#aaa;margin:0">© 2026 FjordFur — Premium kjæledyrutstyr &nbsp;|&nbsp; <a href="https://fjordfur.com/personvern" style="color:#aaa">Personvern</a> &nbsp;|&nbsp; <a href="https://fjordfur.com/vilkar" style="color:#aaa">Vilkår</a></p>
      </div>
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
    orderNumber: `FF-${sessionId.slice(-12)}`,
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
