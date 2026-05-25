import { NextRequest } from 'next/server';

async function getCJToken() {
  const res = await fetch('https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apiKey: process.env.CJ_API_KEY }),
  });
  const data = await res.json();
  return data.data?.accessToken;
}

async function hentOrdreDetaljer(token: string, orderNum: string) {
  const res = await fetch(
    `https://developers.cjdropshipping.com/api2.0/v1/shopping/order/getOrderDetail?orderNum=${orderNum}`,
    { headers: { 'CJ-Access-Token': token } }
  );
  const data = await res.json();
  return data.data;
}

export async function POST(req: NextRequest) {
  const secret = req.nextUrl.searchParams.get('secret');
  if (!process.env.CJ_TRACKING_SECRET || secret !== process.env.CJ_TRACKING_SECRET) {
    return Response.json({ error: 'Ugyldig forespørsel' }, { status: 401 });
  }

  let body: any;
  try {
    body = await req.json();
  } catch {
    return Response.json({ mottatt: true });
  }

  // CJ bruker ulike feltnavn avhengig av API-versjon
  const orderNum: string = body.orderNum || body.orderId || body.order_num || '';
  const trackingNum: string = body.logisticNum || body.trackingNumber || body.tracking_number || body.logisticNum || '';
  const logisticName: string = body.logisticName || body.carrier || '';

  if (!orderNum || !trackingNum) {
    return Response.json({ mottatt: true });
  }

  try {
    const token = await getCJToken();
    const ordre = await hentOrdreDetaljer(token, orderNum);
    const email: string = ordre?.email || '';
    const kundenavn: string = ordre?.shippingCustomerName || '';
    const fornavn = kundenavn.split(' ')[0] || '';

    if (!email) {
      console.error('Sporings-e-post: fant ikke e-post for ordre', orderNum);
      return Response.json({ mottatt: true });
    }

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
  } catch (err) {
    console.error('Feil ved sporings-e-post:', err);
  }

  return Response.json({ mottatt: true });
}
