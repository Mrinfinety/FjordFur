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

  // Produktdata (bilder/varianter) endres sjelden, og pris styres uansett
  // av URL-parametere – ikke av dette svaret. La derfor CDN-en cache
  // vellykkede svar en kort stund for raskere responstid, mens stale svar
  // kan serveres mens et nytt hentes i bakgrunnen. Feil caches ikke.
  const headers: Record<string, string> = {};
  if (data?.data) {
    headers['Cache-Control'] = 'public, s-maxage=600, stale-while-revalidate=86400';
  }

  return Response.json(data, { headers });
}