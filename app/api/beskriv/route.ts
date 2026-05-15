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
        content: `Du er assistent for NordicPaws, en norsk kjæledyrbutikk. Svar KUN med JSON uten kodeblokker eller annen tekst:

{"navn": "kort norsk produktnavn (maks 4 ord)", "beskrivelse": "3-4 setninger norsk produktbeskrivelse"}

Produktet heter: "${produktnavn}"`
      }]
    })
  });

  const data = await res.json();
  const tekst = data.content?.[0]?.text || '{}';

  try {
    const parsed = JSON.parse(tekst);
    return Response.json({ navn: parsed.navn || produktnavn, beskrivelse: parsed.beskrivelse || '' });
  } catch {
    return Response.json({ navn: produktnavn, beskrivelse: tekst });
  }
}