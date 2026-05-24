async function getCJToken() {
  const res = await fetch('https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ apiKey: process.env.CJ_API_KEY }),
  });
  const data = await res.json();
  return data.data?.accessToken;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const vid = searchParams.get('vid') || '6FA41B6C-56EB-4691-BECF-56D59FDFFE64';
  const country = searchParams.get('country') || 'NO';

  const token = await getCJToken();

  const res = await fetch('https://developers.cjdropshipping.com/api2.0/v1/logistic/freightCalculation', {
    method: 'POST',
    headers: { 'CJ-Access-Token': token, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      fromCountryCode: 'CN',
      toCountryCode: country,
      quantity: 1,
      vid,
    }),
  });

  const data = await res.json();
  return Response.json(data);
}
