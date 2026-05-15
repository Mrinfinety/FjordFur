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
  const pid = searchParams.get('pid');

  if (!pid) {
    return Response.json({ error: 'Mangler produkt-ID' }, { status: 400 });
  }

  const token = await getCJToken();

  const res = await fetch(`https://developers.cjdropshipping.com/api2.0/v1/product/query?pid=${pid}`, {
    headers: { 'CJ-Access-Token': token },
  });

  const data = await res.json();
  return Response.json(data);
}