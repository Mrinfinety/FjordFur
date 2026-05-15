export async function POST(req: Request) {
  const { produktnavn, varianter } = await req.json();

  const beskrivelseRes = await fetch('https://api.anthropic.com/v1/messages', {
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
        content: `Du er en nettbutikk-assistent for NordicPaws, en norsk kjæledyrbutikk.

Gjør to ting og svar KUN med JSON, ingen annen tekst:

1. Skriv en kort norsk produktbeskrivelse (3-4 setninger) for: "${produktnavn}"
2. Oversett disse variantnavnene til norsk: ${JSON.stringify(varianter)}

Svar slik:
{
  "beskrivelse": "...",
  "varianter": {"Green": "Grønn", "Pink": "Rosa", "Set": "Sett (2 stk)", ...}
}`
      }]
    })
  });

  const data = await beskrivelseRes.json();
  const tekst = data.content?.[0]?.text || '{}';
  
  try {
    const parsed = JSON.parse(tekst);
    return Response.json(parsed);
  } catch {
    return Response.json({ beskrivelse: tekst, varianter: {} });
  }
}