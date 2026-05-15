export async function POST(req: Request) {
  const { produktnavn } = await req.json();

  const res = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      messages: [{
        role: 'user',
        content: `Skriv en kort og pen norsk produktbeskrivelse (3-4 setninger) for dette kjæledyrproduktet: "${produktnavn}". Beskriv hva produktet er, hvem det passer for og hvorfor det er bra. Ikke bruk overskrifter, bare en naturlig tekst.`
      }]
    })
  });

  const data = await res.json();
  return Response.json({ beskrivelse: data.content?.[0]?.text || '' });
}