export default function Personvern() {
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
        .rback {
          font-size: 13px; color: #666; cursor: pointer;
          text-decoration: none;
        }
        .rback:hover { color: #1a1a18; }
        .rcontainer {
          max-width: 720px; margin: 0 auto;
          padding: 64px 48px;
        }
        .rtitle {
          font-family: 'Cormorant Garamond', serif;
          font-size: 42px; font-weight: 600; color: #1a1a18;
          margin-bottom: 8px;
        }
        .rsub {
          font-size: 14px; color: #888; margin-bottom: 48px; font-weight: 300;
        }
        .rsection {
          margin-bottom: 40px;
          padding-bottom: 40px;
          border-bottom: 1px solid #e8e8e4;
        }
        .rsection:last-child { border-bottom: none; }
        .rsection-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 600; color: #1a1a18;
          margin-bottom: 16px;
        }
        .rsection p {
          font-size: 14px; color: #666; line-height: 1.8; font-weight: 300;
          margin-bottom: 12px;
        }
      `}</style>

      <nav className="rnav">
        <a href="/" className="rlogo">Nordic<span>Paws</span></a>
        <a href="/" className="rback">← Tilbake til butikken</a>
      </nav>

      <div className="rcontainer">
        <h1 className="rtitle">Personvernerklæring</h1>
        <p className="rsub">Oppdatert mai 2026</p>

        <div className="rsection">
          <h2 className="rsection-title">Hvem er vi</h2>
          <p>FjordFur er en norsk nettbutikk som selger kjæledyrutstyr. Kontakt oss på kontakt.fjordfur@gmail.com ved spørsmål om personvern.</p>
        </div>

        <div className="rsection">
          <h2 className="rsection-title">Hvilke data samler vi inn</h2>
          <p>Når du handler hos oss samler vi inn følgende opplysninger:</p>
          <p>— Navn og adresse for levering av varer</p>
          <p>— E-postadresse for ordrebekreftelse</p>
          <p>— Betalingsinformasjon behandles av Stripe og lagres ikke hos oss</p>
        </div>

        <div className="rsection">
          <h2 className="rsection-title">Hvordan bruker vi dataene</h2>
          <p>Vi bruker opplysningene kun til å behandle og levere din bestilling. Vi selger aldri dine personopplysninger til tredjeparter.</p>
          <p>Ordredata deles med CJdropshipping utelukkende for å gjennomføre leveringen.</p>
        </div>

        <div className="rsection">
          <h2 className="rsection-title">Hvor lenge lagrer vi dataene</h2>
          <p>Ordredata (navn, adresse, e-post) lagres i 5 år i henhold til bokføringsloven.</p>
          <p>Øvrige henvendelser via e-post slettes etter 3 år.</p>
          <p>Du kan når som helst be om at dine opplysninger slettes ved å kontakte oss, med mindre lagringen er påkrevd av lov.</p>
        </div>

        <div className="rsection">
          <h2 className="rsection-title">Informasjonskapsler (cookies)</h2>
          <p>Vi bruker kun nødvendige informasjonskapsler for at butikken skal fungere. Vi bruker ingen sporings- eller reklamecookies.</p>
        </div>

        <div className="rsection">
          <h2 className="rsection-title">Dine rettigheter (GDPR)</h2>
          <p>Du har rett til innsyn i, retting av, sletting av og utlevering av dine personopplysninger. Du kan også protestere mot eller kreve begrenset behandling.</p>
          <p>Ta kontakt på kontakt.fjordfur@gmail.com for å benytte disse rettighetene. Du har også rett til å klage til Datatilsynet (datatilsynet.no).</p>
        </div>

        <div className="rsection">
          <h2 className="rsection-title">Kontakt</h2>
          <p><strong>E-post:</strong> kontakt.fjordfur@gmail.com</p>
          <p><strong>Svartid:</strong> Vi svarer innen 1-2 virkedager</p>
        </div>
      </div>
    </div>
  );
}