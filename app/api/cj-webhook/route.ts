import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' as any });

async function hentStripeSession(orderNumber: string) {
  const suffix = orderNumber.replace('FF-', '');
  if (suffix.length !== 12) return null;

  let startingAfter: string | undefined;
  for (let i = 0; i < 10; i++) {
    const result = await stripe.checkout.sessions.list({
      limit: 100,
      ...(startingAfter ? { starting_after: startingAfter } : {}),
    });
    const session = result.data.find(s => s.id.slice(-12) === suffix);
    if (session) return session;
    if (!result.has_more) break;
    startingAfter = result.data[result.data.length - 1].id;
  }
  return null;
}

async function sendSporingsEpost(params: {
  email: string;
  navn: string;
  orderNumber: string;
  trackingNumber: string;
  logisticName: string;
  en: boolean;
}) {
  const { email, navn, orderNumber, trackingNumber, logisticName, en } = params;
  const fornavn = navn?.split(' ')[0] || '';

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e8e8e4;border-radius:8px;overflow:hidden">

      <div style="background:#1a1a18;padding:24px 32px">
        <span style="font-family:Georgia,serif;font-size:22px;color:#ffffff">Fjord<span style="color:#1D9E75">Fur</span></span>
      </div>

      <div style="padding:32px">
        <h1 style="font-family:Georgia,serif;font-size:24px;color:#1a1a18;margin:0 0 8px">
          ${en
            ? `Your order is on its way${fornavn ? ', ' + fornavn : ''}!`
            : `Pakken din er på vei${fornavn ? ', ' + fornavn : ''}!`}
        </h1>
        <p style="color:#666;font-size:14px;margin:0 0 28px">${en ? 'Order number' : 'Ordrenummer'}: <strong>${orderNumber}</strong></p>

        <div style="background:#eaf7f2;border:1px solid #c3e9d8;border-radius:6px;padding:24px;margin-bottom:28px;text-align:center">
          <p style="font-size:12px;color:#888;margin:0 0 6px;text-transform:uppercase;letter-spacing:0.08em">${en ? 'Tracking number' : 'Sporingsnummer'}</p>
          <p style="font-size:24px;font-weight:700;color:#1a1a18;letter-spacing:0.06em;margin:0 0 6px">${trackingNumber}</p>
          <p style="font-size:12px;color:#888;margin:0 0 20px">${en ? 'Carrier' : 'Fraktbærer'}: ${logisticName}</p>
          <a href="https://www.17track.net/en#nums=${trackingNumber}" style="display:inline-block;background:#1D9E75;color:#ffffff;text-decoration:none;padding:12px 32px;border-radius:6px;font-size:14px;font-weight:600">
            ${en ? 'Track my package →' : 'Spor pakken min →'}
          </a>
        </div>

        <div style="background:#f7f7f5;border-radius:6px;padding:16px 20px;margin-bottom:28px">
          <p style="font-size:14px;color:#444;margin:0;line-height:1.7">
            ${en
              ? 'Tracking updates may take 2–3 days to appear after the package is dispatched. Estimated delivery to Norway: <strong>2–3 weeks</strong>.'
              : 'Sporingsoppdateringer kan ta 2–3 dager å dukke opp etter at pakken er sendt. Estimert levering til Norge: <strong>2–3 uker</strong>.'}
          </p>
        </div>

        <div style="border-top:1px solid #e8e8e4;padding-top:24px;margin-bottom:24px">
          <p style="font-size:14px;color:#444;margin:0 0 8px"><strong>${en ? 'Questions?' : 'Spørsmål?'}</strong> ${en ? 'Contact us:' : 'Ta kontakt med oss:'}</p>
          <p style="font-size:14px;color:#444;margin:0">${en ? 'Email' : 'E-post'}: <a href="mailto:contact.fjordfur@gmail.com" style="color:#1D9E75">contact.fjordfur@gmail.com</a></p>
          <p style="font-size:13px;color:#888;margin:6px 0 0">${en ? 'We respond within 1–2 business days.' : 'Vi svarer innen 1–2 virkedager.'}</p>
        </div>

        <div style="text-align:center;margin-bottom:24px">
          <a href="https://fjordfur.com" style="display:inline-block;background:#1a1a18;color:#ffffff;text-decoration:none;padding:11px 24px;border-radius:6px;font-size:13px;font-weight:600">${en ? 'Back to fjordfur.com' : 'Se flere produkter på fjordfur.com'}</a>
        </div>
      </div>

      <div style="background:#f7f7f5;padding:16px 32px;border-top:1px solid #e8e8e4;text-align:center">
        <p style="font-size:11px;color:#aaa;margin:0">© 2026 FjordFur — Premium pet supplies &nbsp;|&nbsp; <a href="https://fjordfur.com/personvern" style="color:#aaa">${en ? 'Privacy' : 'Personvern'}</a></p>
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
      to: email,
      subject: en
        ? `Your package is on its way — ${orderNumber}`
        : `Pakken din er sendt — ${orderNumber}`,
      html,
    }),
  });
}

export async function POST(req: Request) {
  const body = await req.json();

  // CJ can wrap payload in a "data" field
  const data = body.data || body;
  const orderNumber: string = data.orderNumber || data.order_number || '';
  const trackingNumber: string = data.trackingNumber || data.tracking_number || data.logisticNo || '';
  const logisticName: string = data.logisticName || data.logistic_name || data.shippingName || 'CJPacket';

  if (!orderNumber.startsWith('FF-') || !trackingNumber) {
    return Response.json({ ok: true });
  }

  try {
    const session = await hentStripeSession(orderNumber);
    if (!session) {
      console.error('CJ webhook: fant ikke Stripe-session for', orderNumber);
      return Response.json({ ok: true });
    }

    const email = (session.customer_details as any)?.email;
    const navn = (session.customer_details as any)?.name || '';
    const lang = (session.metadata as any)?.lang || 'no';

    if (!email) return Response.json({ ok: true });

    await sendSporingsEpost({ email, navn, orderNumber, trackingNumber, logisticName, en: lang === 'en' });
  } catch (err) {
    console.error('CJ webhook feil:', err);
  }

  return Response.json({ ok: true });
}
