import { NextRequest } from 'next/server';

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

async function getCJToken() {
  const res = await fetch('https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apiKey: process.env.CJ_API_KEY }),
  });
  const data = await res.json();
  return data.data?.accessToken;
}

async function hentSendteOrdrer(token: string): Promise<any[]> {
  const res = await fetch('https://developers.cjdropshipping.com/api2.0/v1/shopping/order/getOrderList', {
    method: 'POST',
    headers: { 'CJ-Access-Token': token, 'Content-Type': 'application/json' },
    body: JSON.stringify({ pageNum: 1, pageSize: 50, orderStatus: 'SHIPPED' }),
  });
  const data = await res.json();
  return data.data?.list || [];
}

async function sendSporingsEpost(
  email: string,
  kundenavn: string,
  orderNum: string,
  trackingNum: string,
  logisticName: string
) {
  const fornavn = kundenavn.split(' ')[0] || '';
  const trackingUrl = `https://t.17track.net/en#nums=${trackingNum}`;

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e8e8e4;border-radius:8px;overflow:hidden">

      <div style="background:#1a1a18;padding:24px 32px">
        <span style="font-family:Georgia,serif;font-size:22px;color:#ffffff">Fjord<span style="color:#1D9E75">Fur</span></span>
      </div>

      <div style="padding:32px">
        <h1 style="font-family:Georgia,serif;font-size:24px;color:#1a1a18;margin:0 0 8px">Pakken din er på vei${fornavn ? ', ' + fornavn : ''}!</h1>
        <p style="color:#666;font-size:14px;margin:0 0 28px">Ordrenummer: <strong>${orderNum}</strong></p>

        <div style="background:#f7f7f5;border-radius:6px;padding:20px;margin-bottom:24px">
          <p style="font-size:12px;color:#888;margin:0 0 6px;text-transform:uppercase;letter-spacing:0.08em">Sporingsnummer</p>
          <p style="font-size:18px;font-weight:600;color:#1a1a18;margin:0 0 4px;letter-spacing:0.04em">${trackingNum}</p>
          ${logisticName ? `<p style="font-size:13px;color:#888;margin:0">Frakttjeneste: ${logisticName}</p>` : ''}
        </div>

        <div style="text-align:center;margin-bottom:28px">
          <a href="${trackingUrl}" style="display:inline-block;background:#1D9E75;color:#ffffff;text-decoration:none;padding:13px 28px;border-radius:6px;font-size:14px;font-weight:600">Spor pakken din</a>
        </div>

        <div style="background:#f7f7f5;border-radius:6px;padding:16px 20px;margin-bottom:24px">
          <p style="font-size:14px;color:#444;margin:0;line-height:1.7">
            Sporingsinformasjon kan ta <strong>1–3 dager</strong> å bli aktiv etter at pakken er sendt.
            Trykk på knappen over for å følge pakken din.
          </p>
        </div>

        <div style="border-top:1px solid #e8e8e4;padding-top:20px">
          <p style="font-size:14px;color:#444;margin:0 0 4px"><strong>Spørsmål?</strong></p>
          <p style="font-size:14px;color:#444;margin:0">E-post: <a href="mailto:contact.fjordfur@gmail.com" style="color:#1D9E75">contact.fjordfur@gmail.com</a></p>
        </div>
      </div>

      <div style="background:#f7f7f5;padding:16px 32px;border-top:1px solid #e8e8e4;text-align:center">
        <p style="font-size:11px;color:#aaa;margin:0">© 2026 FjordFur — Premium kjæledyrutstyr &nbsp;|&nbsp; <a href="https://fjordfur.com/personvern" style="color:#aaa">Personvern</a></p>
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
      subject: `Pakken din er på vei! Sporingsnummer: ${trackingNum} — FjordFur`,
      html,
    }),
  });
}

export async function GET(req: NextRequest) {
  // Beskytt mot uautoriserte kall (Vercel kaller med CRON_SECRET header)
  const authHeader = req.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return Response.json({ error: 'Uautorisert' }, { status: 401 });
  }

  let sendt = 0;
  let feil = 0;

  try {
    const token = await getCJToken();
    const ordrer = await hentSendteOrdrer(token);

    for (const ordre of ordrer) {
      const orderNum: string = ordre.orderNum || '';
      const trackingNum: string = ordre.trackingNumber || ordre.logisticNum || '';
      const email: string = ordre.email || '';
      const kundenavn: string = ordre.shippingCustomerName || '';
      const logisticName: string = ordre.shippingName || ordre.logisticName || '';

      if (!orderNum || !trackingNum || !email) continue;

      const kvKey = `tracking_sent:${orderNum}`;
      const alleredeSendt = await kvGet(kvKey);
      if (alleredeSendt) continue;

      try {
        await sendSporingsEpost(email, kundenavn, orderNum, trackingNum, logisticName);
        await kvSet(kvKey, '1', 60 * 60 * 24 * 90); // 90 dager TTL
        sendt++;
      } catch (err) {
        console.error(`Feil ved sporings-e-post for ${orderNum}:`, err);
        feil++;
      }
    }
  } catch (err) {
    console.error('Cron tracking feil:', err);
    return Response.json({ error: String(err) }, { status: 500 });
  }

  return Response.json({ sendt, feil });
}
