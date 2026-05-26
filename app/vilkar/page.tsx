export default function Vilkar() {
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
        .rcontainer { max-width: 720px; margin: 0 auto; padding: 64px 48px; }
        .rtitle {
          font-family: 'Cormorant Garamond', serif;
          font-size: 42px; font-weight: 600; color: #1a1a18; margin-bottom: 8px;
        }
        .rsub { font-size: 14px; color: #888; margin-bottom: 48px; font-weight: 300; }
        .rsection { margin-bottom: 40px; padding-bottom: 40px; border-bottom: 1px solid #e8e8e4; }
        .rsection:last-child { border-bottom: none; }
        .rsection-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 600; color: #1a1a18; margin-bottom: 16px;
        }
        .rsection p { font-size: 14px; color: #666; line-height: 1.8; font-weight: 300; margin-bottom: 12px; }
      `}</style>

      <nav className="rnav">
        <a href="/" className="rlogo">Fjord<span>Fur</span></a>
        <a href="/" className="rback">← Tilbake til butikken</a>
      </nav>

      <div className="rcontainer">
        <h1 className="rtitle">Vilkår og betingelser</h1>
        <p className="rsub">Oppdatert mai 2026</p>

        <div className="rsection">
          <h2 className="rsection-title">Om FjordFur</h2>
          <p>FjordFur er en norsk nettbutikk som selger kjæledyrutstyr. Org.nr. 930 827 525. Kontakt: contact.fjordfur@gmail.com. Ved å handle hos oss godtar du disse vilkårene.</p>
          <p>Kontakt: contact.fjordfur@gmail.com</p>
        </div>

        <div className="rsection">
          <h2 className="rsection-title">Bestilling og betaling</h2>
          <p>Alle priser er oppgitt i norske kroner (NOK). FjordFur er ikke mva-registrert, og prisene inkluderer ikke merverdiavgift.</p>
          <p>Betaling skjer sikkert via Stripe, som støtter alle vanlige betalingskort.</p>
          <p>Du mottar en ordrebekreftelse på e-post etter fullført kjøp.</p>
        </div>

        <div className="rsection">
          <h2 className="rsection-title">Levering</h2>
          <p>Vi leverer til hele Norge. Estimert leveringstid er 2–3 uker fra bestillingsdato.</p>
          <p>Gratis frakt på alle ordre over kr 499. Ved ordre under kr 499 beregnes frakt ved kassen.</p>
        </div>

        <div className="rsection">
          <h2 className="rsection-title">Angrerett og retur</h2>
          <p>Du har 14 dagers angrerett fra mottak av varen, i henhold til angrerettloven.</p>
          <p>For å benytte angreretten fyller du ut <a href="/angreskjema" style={{ color: '#1D9E75' }}>standardskjema for angrerett</a> og sender det til contact.fjordfur@gmail.com innen 14 dager etter mottak av varen.</p>
          <p>Vi refunderer hele kjøpesummen uten at du trenger å sende varen tilbake. Refusjon utbetales innen 14 dager etter at vi har mottatt angreskjemaet.</p>
        </div>

        <div className="rsection">
          <h2 className="rsection-title">Reklamasjon</h2>
          <p>Du har 2 års reklamasjonsrett i henhold til forbrukerkjøpsloven. Mottar du et defekt eller feil produkt, kontakt oss på contact.fjordfur@gmail.com med bilde av produktet.</p>
          <p>Vi sender nytt produkt eller refunderer kjøpesummen uten kostnad for deg.</p>
        </div>

        <div className="rsection">
          <h2 className="rsection-title">Personvern</h2>
          <p>Vi behandler dine personopplysninger i henhold til vår <a href="/personvern" style={{ color: '#1D9E75' }}>personvernerklæring</a>.</p>
        </div>

        <div className="rsection">
          <h2 className="rsection-title">Kontakt</h2>
          <p><strong>E-post:</strong> contact.fjordfur@gmail.com</p>
          <p><strong>Svartid:</strong> Vi svarer innen 1–2 virkedager</p>
        </div>
      </div>
    </div>
  );
}