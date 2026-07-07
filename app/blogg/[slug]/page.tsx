'use client';
import { useParams } from 'next/navigation';
import { PRODUKTER } from '../../../lib/produkter';
import { ARTIKLER, hentArtikkel } from '../../../lib/blogg';

function produktLenke(cjId: string): string {
  const p = PRODUKTER.find(x => x.cjId === cjId);
  if (!p) return '/';
  return `/produkt/${p.cjId}?pris=${p.pris}&margin=${p.margin}`;
}

// cjId-er for produktene det lenkes til
const SAKTE_FORER = '1653041912300969984';
const VANNFLASKE = '2504100230321610200';
const BAJSPOSE = '1767124394830204928';

const INNHOLD: Record<string, React.ReactNode> = {
  'hvorfor-spiser-hunden-for-fort': (
    <>
      <p>
        Mange hundeeiere kjenner seg igjen: matskåla er knapt satt ned før den er tom. At hunden sluker
        maten kan virke uskyldig, men rask spising kan faktisk føre til flere helseproblemer. Her ser vi
        på hvorfor hunden spiser så fort, og hva du enkelt kan gjøre for roligere og tryggere måltider.
      </p>

      <h2>Hvorfor spiser hunden så fort?</h2>
      <p>
        Det finnes flere forklaringer. Hos mange hunder ligger det i instinktene — i naturen måtte forfedrene
        spise raskt før andre i flokken tok maten. Konkurranse fra andre dyr i husholdningen kan forsterke
        denne adferden. Noen hunder spiser fort fordi de er ekstra sultne, har uregelmessige måltider, eller
        rett og slett fordi de elsker maten. Også rase og temperament spiller inn: ivrige og energiske hunder
        har ofte et høyere spisetempo.
      </p>

      <h2>Hvilke problemer kan rask spising føre til?</h2>
      <p>
        Når hunden sluker maten, svelger den samtidig mye luft. Dette kan gi oppblåsthet, raping og ubehag.
        I verste fall kan det bidra til en livstruende tilstand kalt gastrisk dilatasjon og volvulus (GDV),
        der magesekken fylles med luft og vrir seg — spesielt hos store raser. Rask spising øker også risikoen
        for at hunden kaster opp maten igjen, og for at den setter den i halsen og kveler seg. På sikt kan det
        i tillegg gjøre det vanskeligere å holde en sunn vekt.
      </p>

      <h2>Slik får du hunden til å spise saktere</h2>
      <p>
        Den gode nyheten er at du kan gjøre mye selv. Del måltidet opp i flere mindre porsjoner gjennom dagen,
        og sørg for ro rundt matplassen hvis du har flere dyr. Et av de enkleste og mest effektive grepene er å
        bytte til en{' '}
        <a className="blink" href={produktLenke(SAKTE_FORER)}>sakte-fôrer skål</a>. Skålen har en ribbestruktur
        i bunnen som tvinger hunden til å jobbe litt for hver matbit, slik at spisetempoet bremses helt naturlig.
        Det reduserer luftsvelging og oppblåsthet — samtidig som det gir hunden god mental stimulering.
      </p>

      <h2>Når bør du kontakte veterinær?</h2>
      <p>
        Hvis hunden plutselig endrer spisevaner, virker oppblåst, prøver å kaste opp uten å få det til, eller
        virker urolig og smertepåvirket etter måltid, bør du kontakte veterinær raskt. Dette kan være tegn på
        GDV, som krever akutt hjelp. Du finner gode råd om hold og fôring av hund hos{' '}
        <a className="blink" href="https://www.mattilsynet.no/dyr/kjaledyr-og-konkurransedyr/hund" target="_blank" rel="noopener noreferrer">Mattilsynet</a>.
        Med små justeringer i rutinene — og riktige hjelpemidler — kan måltidene bli både tryggere og
        roligere for hunden din.
      </p>
      <p>
        Skal dere ut på tur etter måltidet? Se også vår{' '}
        <a className="blink" href="/blogg/pakkeliste-til-hundeturen">pakkeliste til hundeturen</a>, så er
        dere godt forberedt.
      </p>
    </>
  ),
  'pakkeliste-til-hundeturen': (
    <>
      <p>
        Enten dere skal på en kort skogstur eller en hel dag på fjellet, gjør god planlegging turen tryggere
        og koseligere for både deg og hunden. Her er den komplette pakkelisten — med alt du trenger for en
        vellykket hundetur.
      </p>

      <h2>Vann og mat</h2>
      <p>
        Det aller viktigste på tur er at hunden får nok å drikke. Hunder kjøler seg ned ved å pese og mister
        mye væske — spesielt på varme dager eller lange turer. Ta derfor alltid med rikelig vann. En praktisk
        løsning er en{' '}
        <a className="blink" href={produktLenke(VANNFLASKE)}>vannflaske 2-i-1</a> med integrert drikkekopp og
        matbeholder, slik at hunden enkelt kan drikke underveis uten søl. Skal dere på en lengre tur, pakk også
        litt tørrfôr eller godbiter for ekstra energi. Spiser hunden litt vel ivrig? Les hvorfor{' '}
        <a className="blink" href="/blogg/hvorfor-spiser-hunden-for-fort">hunden spiser for fort</a> — og hva du
        kan gjøre med det.
      </p>

      <h2>Bæsjeposer og hygiene</h2>
      <p>
        Å rydde opp etter hunden er både god folkeskikk og som regel påbudt. Ha alltid med nok poser — gjerne
        flere enn du tror du trenger. En{' '}
        <a className="blink" href={produktLenke(BAJSPOSE)}>bæsjepose-holder</a> som festes på båndet gjør at du
        alltid har posene tilgjengelig, og slipper å rote i lommene. Ta også med litt håndsprit eller
        våtservietter til deg selv.
      </p>

      <h2>Bånd, sele og sikkerhet</h2>
      <p>
        Sørg for at båndet og selen sitter godt og er i god stand. På ukjente områder, eller i nærheten av vei
        og dyreliv, bør hunden holdes i bånd — husk også den{' '}
        <a className="blink" href="https://lovdata.no/dokument/NL/lov/2003-07-04-74" target="_blank" rel="noopener noreferrer">lovpålagte båndtvangen</a>{' '}
        som gjelder store deler av året. En refleks eller et lys på halsbåndet er smart hvis dere er ute i
        mørket. Ha også med ID-merking og kontaktinformasjon, i tilfelle hunden skulle komme bort.
      </p>

      <h2>Førstehjelp og det lille ekstra</h2>
      <p>
        Pakk en liten førstehjelpspakke med bandasje, pinsett (for flått og fliser) og eventuelle medisiner
        hunden bruker. På kalde dager kan en hundedekken være kjekt, og på varme dager bør dere planlegge pauser
        i skyggen. Til slutt: ikke glem favorittleken — og kameraet, for turen blir garantert full av fine
        øyeblikk. Med riktig utstyr i sekken er dere klare for eventyr. God tur!
      </p>
    </>
  ),
};

export default function Artikkel() {
  const { slug } = useParams();
  const artikkel = hentArtikkel(slug as string);
  const innhold = INNHOLD[slug as string];

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#fafaf8', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fafaf8; }
        .rnav {
          position: sticky; top: 0; z-index: 100;
          background: rgba(250,250,248,0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid #e8e8e4;
          padding: 0 48px; height: 64px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .rlogo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 600; color: #1a1a18;
          text-decoration: none;
        }
        .rlogo span { color: #1D9E75; }
        .rback { font-size: 13px; color: #666; text-decoration: none; }
        .rback:hover { color: #1a1a18; }
        .acontainer { max-width: 720px; margin: 0 auto; padding: 64px 48px; }
        .acrumb { font-size: 13px; color: #aaa; margin-bottom: 24px; }
        .acrumb a { color: #1D9E75; text-decoration: none; }
        .ameta { font-size: 12px; letter-spacing: 0.06em; text-transform: uppercase; color: #1D9E75; font-weight: 500; margin-bottom: 16px; }
        .atitle {
          font-family: 'Cormorant Garamond', serif;
          font-size: 44px; font-weight: 600; color: #1a1a18;
          line-height: 1.15; margin-bottom: 32px;
        }
        .abody p { font-size: 16px; color: #555; line-height: 1.9; font-weight: 300; margin-bottom: 24px; }
        .abody h2 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 26px; font-weight: 600; color: #1a1a18;
          margin: 40px 0 16px;
        }
        .blink { color: #1D9E75; font-weight: 500; text-decoration: underline; text-underline-offset: 2px; }
        .blink:hover { color: #1a1a18; }
        .arelated { margin-top: 48px; padding-top: 32px; border-top: 1px solid #e8e8e4; }
        .arelated-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 600; color: #1a1a18; margin-bottom: 20px;
        }
        .arelated-list { display: grid; gap: 12px; }
        .arelated-card {
          display: flex; align-items: center; gap: 14px;
          padding: 14px 16px; background: #fff;
          border: 1px solid #e8e8e4; border-radius: 10px;
          text-decoration: none; transition: all 0.2s;
        }
        .arelated-card:hover { border-color: #d4d4ce; box-shadow: 0 6px 20px rgba(0,0,0,0.06); transform: translateY(-2px); }
        .arelated-emoji { font-size: 28px; }
        .arelated-name { display: block; font-size: 15px; font-weight: 500; color: #1a1a18; }
        .arelated-meta { display: block; font-size: 12px; color: #aaa; margin-top: 2px; }
        .afooter {
          margin-top: 48px; padding-top: 32px; border-top: 1px solid #e8e8e4;
          display: flex; flex-wrap: wrap; gap: 16px; justify-content: space-between; align-items: center;
        }
        .acta {
          background: #1a1a18; color: #fafaf8;
          border-radius: 8px; padding: 12px 24px;
          font-size: 14px; font-weight: 500; text-decoration: none;
          transition: background 0.2s;
        }
        .acta:hover { background: #1D9E75; }
        .aback-link { font-size: 14px; color: #666; text-decoration: none; }
        .aback-link:hover { color: #1a1a18; }
        @media (max-width: 768px) {
          .rnav { padding: 0 20px; }
          .acontainer { padding: 40px 20px; }
          .atitle { font-size: 32px; }
          .abody h2 { font-size: 22px; }
        }
      `}</style>

      <nav className="rnav">
        <a href="/" className="rlogo">Fjord<span>Fur</span></a>
        <a href="/blogg" className="rback">← Alle artikler</a>
      </nav>

      {artikkel && innhold ? (
        <>
          <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            "headline": artikkel.tittel,
            "description": artikkel.metaBeskrivelse,
            "datePublished": artikkel.datoISO,
            "author": { "@type": "Organization", "name": "FjordFur" },
            "publisher": { "@type": "Organization", "name": "FjordFur" },
            "mainEntityOfPage": `${process.env.NEXT_PUBLIC_SITE_URL || "https://fjordfur.com"}/blogg/${artikkel.slug}`,
          })}} />

          <article className="acontainer">
            <div className="acrumb"><a href="/blogg">Blogg</a> / {artikkel.tittel}</div>
            <p className="ameta">{artikkel.dato} · {artikkel.lesetid} lesing</p>
            <h1 className="atitle">{artikkel.tittel}</h1>
            <div className="abody">{innhold}</div>
            {ARTIKLER.filter(a => a.slug !== (slug as string)).length > 0 && (
              <aside className="arelated">
                <h2 className="arelated-title">Les også</h2>
                <div className="arelated-list">
                  {ARTIKLER.filter(a => a.slug !== (slug as string)).map(a => (
                    <a key={a.slug} href={`/blogg/${a.slug}`} className="arelated-card">
                      <span className="arelated-emoji">{a.emoji}</span>
                      <span>
                        <span className="arelated-name">{a.tittel}</span>
                        <span className="arelated-meta">{a.dato} · {a.lesetid} lesing</span>
                      </span>
                    </a>
                  ))}
                </div>
              </aside>
            )}
            <div className="afooter">
              <a href="/blogg" className="aback-link">← Tilbake til bloggen</a>
              <a href="/" className="acta">Se alle produkter</a>
            </div>
          </article>
        </>
      ) : (
        <div className="acontainer">
          <h1 className="atitle">Artikkelen finnes ikke</h1>
          <p style={{ color: '#777', marginBottom: '24px' }}>Vi fant dessverre ikke artikkelen du leter etter.</p>
          <a href="/blogg" className="acta">Til bloggen</a>
        </div>
      )}
    </div>
  );
}
