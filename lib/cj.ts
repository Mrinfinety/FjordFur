// Delt CJ-token-henting med caching.
//
// CJ tillater bare ~1 autentisering per 5. minutt, og tidligere hentet hver
// API-rute nytt token per forespørsel – da feilet kall (og produktbilder
// uteble) så snart flere forespørsler kom tett. Tokenet er gyldig i ~15 dager,
// så vi cacher det i KV (delt mellom alle serverless-instanser) og i
// modul-minne som rask/lokal fallback. Feiler auth (f.eks. rate limit) gjenbrukes
// et eventuelt gammelt token i stedet for å svare med feil.

const TOKEN_TTL_SEK = 6 * 3600;

let minneToken: string | null = null;
let minneUtlop = 0;

async function kvGet(key: string): Promise<string | null> {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return null;
  try {
    const res = await fetch(`${process.env.KV_REST_API_URL}/get/${key}`, {
      headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` },
    });
    const data = await res.json();
    return data.result ?? null;
  } catch {
    return null;
  }
}

async function kvSet(key: string, value: string, exSeconds: number): Promise<void> {
  if (!process.env.KV_REST_API_URL || !process.env.KV_REST_API_TOKEN) return;
  try {
    await fetch(`${process.env.KV_REST_API_URL}/set/${key}/${encodeURIComponent(value)}?ex=${exSeconds}`, {
      headers: { Authorization: `Bearer ${process.env.KV_REST_API_TOKEN}` },
    });
  } catch {
    // Cache-skriving skal aldri velte selve kallet.
  }
}

export async function getCJToken(): Promise<string | undefined> {
  const naa = Date.now();

  if (minneToken && naa < minneUtlop) return minneToken;

  const fraKv = await kvGet('cj_access_token');
  if (fraKv) {
    minneToken = fraKv;
    minneUtlop = naa + 5 * 60_000; // sjekk KV igjen om 5 min
    return fraKv;
  }

  try {
    const res = await fetch('https://developers.cjdropshipping.com/api2.0/v1/authentication/getAccessToken', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ apiKey: process.env.CJ_API_KEY }),
    });
    const data = await res.json();
    const token: string | undefined = data.data?.accessToken;
    if (token) {
      minneToken = token;
      minneUtlop = naa + TOKEN_TTL_SEK * 1000;
      await kvSet('cj_access_token', token, TOKEN_TTL_SEK);
      return token;
    }
  } catch {
    // faller videre til stale-gjenbruk under
  }

  // Auth feilet (typisk 5-min-grensen): gjenbruk gammelt token om vi har ett.
  return minneToken ?? undefined;
}
