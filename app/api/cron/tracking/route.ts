import Stripe from 'stripe';
import { NextRequest } from 'next/server';
import { getCJToken } from '../../../../lib/cj';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2024-06-20' as any });

async function kvGet(key: string): Promise<string | null> {
  const res = await fetch(`${process.env.KV_REST_API_URL}/get/${key}`, {
    headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` },
  });
  const data = await res.json();
  return data.result ?? null;
}

async function kvSet(key: string, value: string, exSeconds: number): Promise<void> {
  await fetch(`${process.env.KV_REST_API_URL}/set/${key}/${value}?ex=${exSeconds}`, {
    headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` },
  });
}

async function hentOrdrer(token: string, status: string): Promise<any[]> {
  const res = await fetch('https://developers.cjdropshipping.com/api2.0/v1/shopping/order/getOrderList', {
    method: 'POST',
    headers: { 'CJ-Access-Token': token, 'Content-Type': 'application/json' },
    body: JSON.stringify({ pageNum: 1, pageSize: 50, orderStatus: status }),
  });
  const data = await res.json();
  return data.data?.list || [];
}

async function hentLang(orderNum: string): Promise<string> {
  try {
    const suffix = orderNum.replace('FF-', '');
    if (suffix.length !== 12) return 'no';
    let startingAfter: string | undefined;
    for (let i = 0; i < 5; i++) {
      const result = await stripe.checkout.sessions.list({
        limit: 100,
        ...(startingAfter ? { starting_after: startingAfter } : {}),
      });
      const session = result.data.find(s => s.id.slice(-12) === suffix);
      if (session) return (session.metadata as any)?.lang || 'no';
      if (!result.has_more) break;
      startingAfter = result.data[result.data.length - 1].id;
    }
  } catch {}
  return 'no';
}

async function sendSporingsEpost(params: {
  email: string;
  kundenavn: string;
  orderNum: string;
  trackingNum: string;
  logisticName: string;
  lang: string;
}) {
  const { email, kundenavn, orderNum, trackingNum, logisticName, lang } = params;
  const en = lang === 'en';
  const fornavn = kundenavn.split(' ')[0] || '';
  const trackingUrl = `https://www.17track.net/en#nums=${trackingNum}`;

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
        <p style="color:#666;font-size:14px;margin:0 0 28px">${en ? 'Order number' : 'Ordrenummer'}: <strong>${orderNum}</strong></p>

        <div style="background:#eaf7f2;border:1px solid #c3e9d8;border-radius:6px;padding:24px;margin-bottom:28px;text-align:center">
          <p style="font-size:12px;color:#888;margin:0 0 6px;text-transform:uppercase;letter-spacing:0.08em">${en ? 'Tracking number' : 'Sporingsnummer'}</p>
          <p style="font-size:24px;font-weight:700;color:#1a1a18;letter-spacing:0.06em;margin:0 0 6px">${trackingNum}</p>
          <a href="${trackingUrl}" style="display:inline-block;background:#1D9E75;color:#ffffff;text-decoration:none;padding:12px 32px;border-radius:6px;font-size:14px;font-weight:600">
            ${en ? 'Track my package →' : 'Spor pakken min →'}
          </a>
        </div>

        <div style="background:#f7f7f5;border-radius:6px;padding:16px 20px;margin-bottom:28px">
          <p style="font-size:14px;color:#444;margin:0;line-height:1.7">
            ${en
              ? 'Tracking updates may take 2–3 days to appear after the package is dispatched.'
              : 'Sporingsoppdateringer kan ta 2–3 dager å dukke opp etter at pakken er sendt.'}
          </p>
        </div>

        <div style="border-top:1px solid #e8e8e4;padding-top:24px;margin-bottom:24px">
          <p style="font-size:14px;color:#444;margin:0 0 8px"><strong>${en ? 'Questions?' : 'Spørsmål?'}</strong></p>
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
        ? `Your package is on its way — ${orderNum}`
        : `Pakken din er sendt — ${orderNum}`,
      html,
    }),
  });
}

async function sendAnmeldelseEpost(params: {
  email: string;
  kundenavn: string;
  orderNum: string;
  lang: string;
}) {
  const { email, kundenavn, orderNum, lang } = params;
  const en = lang === 'en';
  const fornavn = kundenavn.split(' ')[0] || '';
  const reviewUrl = 'https://www.trustpilot.com/review/fjordfur.com';

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e8e8e4;border-radius:8px;overflow:hidden">
      <div style="background:#1a1a18;padding:24px 32px">
        <span style="font-family:Georgia,serif;font-size:22px;color:#ffffff">Fjord<span style="color:#1D9E75">Fur</span></span>
      </div>
      <div style="padding:32px">
        <h1 style="font-family:Georgia,serif;font-size:24px;color:#1a1a18;margin:0 0 8px">
          ${en ? `How was your order${fornavn ? ', ' + fornavn : ''}?` : `Hvordan var bestillingen${fornavn ? ', ' + fornavn : ''}?`}
        </h1>
        <p style="color:#666;font-size:14px;margin:0 0 28px">${en ? 'Order number' : 'Ordrenummer'}: <strong>${orderNum}</strong></p>

        <div style="background:#f7f7f5;border-radius:6px;padding:24px;margin-bottom:28px;text-align:center">
          <p style="font-size:15px;color:#333;margin:0 0 20px;line-height:1.6">
            ${en
              ? 'We hope your order arrived safely! If you have a moment, we\'d love to hear what you think.'
              : 'Vi håper pakken kom frem som den skulle! Hvis du har et øyeblikk, vil vi gjerne høre hva du synes.'}
          </p>
          <div style="margin-bottom:12px">
            <span style="font-size:28px;letter-spacing:4px">★★★★★</span>
          </div>
          <a href="${reviewUrl}" style="display:inline-block;background:#1D9E75;color:#ffffff;text-decoration:none;padding:12px 32px;border-radius:6px;font-size:14px;font-weight:600">
            ${en ? 'Leave a review →' : 'Skriv en anmeldelse →'}
          </a>
        </div>

        <div style="border-top:1px solid #e8e8e4;padding-top:24px;margin-bottom:24px">
          <p style="font-size:14px;color:#444;margin:0 0 8px"><strong>${en ? 'Questions?' : 'Spørsmål?'}</strong></p>
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
        ? `How was your FjordFur order? — ${orderNum}`
        : `Hvordan var FjordFur-bestillingen din? — ${orderNum}`,
      html,
    }),
  });
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: 'Uautorisert' }, { status: 401 });
  }

  let sendt = 0;
  let anmeldelser = 0;
  let feil = 0;

  try {
    const token = await getCJToken();
    if (!token) {
      return Response.json({ feil: 'Fikk ikke CJ-token – prøver igjen neste kjøring' }, { status: 503 });
    }
    const [sendteOrdrer, leverteOrdrer] = await Promise.all([
      hentOrdrer(token, 'SHIPPED'),
      hentOrdrer(token, 'FINISH'),
    ]);

    const alleOrdrer = [...sendteOrdrer, ...leverteOrdrer];
    const sett = new Set<string>();
    const unikeOrdrer = alleOrdrer.filter(o => {
      if (sett.has(o.orderNum)) return false;
      sett.add(o.orderNum);
      return true;
    });

    for (const ordre of unikeOrdrer) {
      const orderNum: string = ordre.orderNum || '';
      const trackingNum: string = ordre.trackingNumber || ordre.logisticNum || '';
      const email: string = ordre.email || '';
      const kundenavn: string = ordre.shippingCustomerName || '';

      if (!orderNum || !email) continue;

      const trackingKey = `tracking_sent:${orderNum}`;
      const reviewPendingKey = `review_pending:${orderNum}`;
      const reviewSentKey = `review_sent:${orderNum}`;

      const [trackingSendt, reviewPending, reviewSendt] = await Promise.all([
        kvGet(trackingKey),
        kvGet(reviewPendingKey),
        kvGet(reviewSentKey),
      ]);

      // Send tracking email if not sent yet
      if (!trackingSendt && trackingNum) {
        try {
          const lang = await hentLang(orderNum);
          await sendSporingsEpost({ email, kundenavn, orderNum, trackingNum, logisticName: '', lang });
          await kvSet(trackingKey, '1', 60 * 60 * 24 * 90);
          await kvSet(reviewPendingKey, '1', 60 * 60 * 24 * 21);
          sendt++;
        } catch (err) {
          console.error(`Feil ved sporings-e-post for ${orderNum}:`, err);
          feil++;
        }
      }

      // Send review email if 21 days have passed (review_pending expired) and not sent yet
      if (trackingSendt && !reviewPending && !reviewSendt) {
        try {
          const lang = await hentLang(orderNum);
          await sendAnmeldelseEpost({ email, kundenavn, orderNum, lang });
          await kvSet(reviewSentKey, '1', 60 * 60 * 24 * 90);
          anmeldelser++;
        } catch (err) {
          console.error(`Feil ved anmeldelses-e-post for ${orderNum}:`, err);
          feil++;
        }
      }
    }
  } catch (err) {
    console.error('Cron tracking feil:', err);
    return Response.json({ error: String(err) }, { status: 500 });
  }

  return Response.json({ sendt, anmeldelser, feil });
}
