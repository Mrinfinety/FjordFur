export interface BloggArtikkel {
  slug: string;
  tittel: string;
  metaTittel: string;
  metaBeskrivelse: string;
  ingress: string;
  dato: string;
  datoISO: string;
  lesetid: string;
  emoji: string;
}

export const ARTIKLER: BloggArtikkel[] = [
  {
    slug: 'hvorfor-spiser-hunden-for-fort',
    tittel: 'Hvorfor spiser hunden for fort – og hva du kan gjøre',
    metaTittel: 'Hvorfor spiser hunden for fort – og hva du kan gjøre',
    metaBeskrivelse:
      'Spiser hunden maten altfor raskt? Lær hvorfor hunder sluker maten, hvilke farer det medfører, og enkle grep – som sakte-fôring – for roligere og tryggere måltider.',
    ingress:
      'Matskåla er knapt satt ned før den er tom. Vi ser på hvorfor hunden spiser så fort, hvilke farer det kan medføre, og hva du enkelt kan gjøre med det.',
    dato: 'mai 2026',
    datoISO: '2026-05-12',
    lesetid: '4 min',
    emoji: '🥣',
  },
  {
    slug: 'pakkeliste-til-hundeturen',
    tittel: 'Pakkeliste til hundeturen',
    metaTittel: 'Pakkeliste til hundeturen',
    metaBeskrivelse:
      'Skal du på tur med hunden? Her er den komplette pakkelisten med alt du trenger – fra vann og mat til bæsjeposer, sikkerhet og førstehjelp.',
    ingress:
      'God planlegging gjør turen tryggere og koseligere for både deg og hunden. Her er den komplette pakkelisten for en vellykket hundetur.',
    dato: 'mai 2026',
    datoISO: '2026-05-12',
    lesetid: '4 min',
    emoji: '🎒',
  },
];

export function hentArtikkel(slug: string): BloggArtikkel | undefined {
  return ARTIKLER.find(a => a.slug === slug);
}
