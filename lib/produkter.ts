export interface ProduktKonfig {
  cjId: string;
  navn: string;
  navnEn: string;
  sub: string;
  subEn: string;
  pris: number;
  margin: number;
  emoji: string;
  cat: 'hund' | 'katt';
  bildIndex?: number;
  beskrivelse: string;
  beskrivelseEn: string;
  behold_bilder?: number[];
  tillatte_vider?: string[];
  skjul_varianter?: string[];
  enkel_picker?: boolean;
}

export const PRODUKTER: ProduktKonfig[] = [
  {
    cjId: '1653041912300969984',
    navn: 'Sakte-forer Skål',
    navnEn: 'Slow Feeder Bowl',
    sub: 'Forhindrer kvelning, hund/katt',
    subEn: 'Prevents choking, dogs & cats',
    pris: 149,
    margin: 132,
    emoji: '🥣',
    cat: 'hund',
    bildIndex: 1,
    enkel_picker: true,
    beskrivelse: 'En spesiallaget skål som bremser ned spisetempoet til hunden eller katten din. Forhindrer kvelning, oppblåsthet og fordøyelsesproblemer som kan oppstå ved rask spising. Ribbestrukturen i bunnen gjør at kjæledyret ditt må jobbe litt for maten — noe som stimulerer både kropp og hjerne. Laget av slitesterkt, BPA-fritt materiale som er enkelt å rengjøre.',
    beskrivelseEn: "A specially designed bowl that slows down your dog or cat's eating pace. Prevents choking, bloating and digestive issues caused by rapid eating. The ridge structure at the bottom encourages your pet to work for their food — stimulating both body and mind. Made from durable, BPA-free material that is easy to clean.",
  },
  {
    cjId: '2504100230321610200',
    navn: 'Vannflaske 2-i-1',
    navnEn: 'Water Bottle 2-in-1',
    sub: 'Med matbeholder, perfekt for turer',
    subEn: 'With food container, perfect for trips',
    pris: 249,
    margin: 120,
    emoji: '🚰',
    cat: 'hund',
    beskrivelse: 'Praktisk 2-i-1 løsning med integrert vannflaske og matbeholder i én enhet. Perfekt for turer, hytteturer og utflukter med hunden din. Trykk på knappen for å fylle den innebygde drikkekoppen med akkurat passe vann — raskt og uten søl. Kompakt design som enkelt får plass i en ryggsekk eller hundebag.',
    beskrivelseEn: 'A practical 2-in-1 solution with an integrated water bottle and food container in one unit. Perfect for hikes, cabin trips and outdoor adventures with your dog. Press the button to fill the built-in drinking cup with just the right amount of water — quickly and without spills. Compact design that fits easily in a backpack or dog bag.',
  },
  {
    cjId: '1767124394830204928',
    navn: 'Bajspose-holder',
    navnEn: 'Poop Bag Holder',
    sub: 'Praktisk holder til hundeposen',
    subEn: 'Practical holder for dog waste bags',
    pris: 169,
    margin: 79,
    emoji: '🐾',
    cat: 'hund',
    enkel_picker: true,
    behold_bilder: [0, 3, 4, 5, 8, 12, 18, 20, 21, 23, 27, 28, 29, 35, 36, 37],
    tillatte_vider: [
      '1767124394905702400',
      '1767124394964422656',
      '1767124395123806208',
      '1767124395178332160',
      '1767124395249635328',
      '1767124395409018880',
      '1767124395463544832',
    ],
    beskrivelse: 'En hendig og diskret holder til hundeposen som enkelt festes til båndet, ryggsekken eller nøkkelknippet. Slipper du å rote i lommene etter poser — holderen holder dem alltid tilgjengelig der du trenger dem. Tett lukking holder posene på plass, og det kompakte designet er lett å ta med overalt. Velg mellom flere farger.',
    beskrivelseEn: 'A convenient and discreet dog waste bag holder that easily attaches to a leash, backpack or keychain. No more searching through pockets — the holder keeps bags always at hand when you need them. A secure closure keeps bags in place, and the compact design makes it easy to bring along anywhere. Available in multiple colours.',
  },
];

export function hentRelaterte(cjId: string) {
  return PRODUKTER.filter(p => p.cjId !== cjId);
}
