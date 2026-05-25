export default function Retur() {
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
        .highlight {
          background: #EAF5EE; border-radius: 8px;
          padding: 16px 20px; margin-top: 16px;
          font-size: 14px; color: #085041; line-height: 1.7;
        }
      `}</style>

      <nav className="rnav">
        <a href="/" className="rlogo">Fjord<span>Fur</span></a>
        <a href="/" className="rback">← Tilbake til butikken</a>
      </nav>

      <div className="rcontainer">
        <h1 className="rtitle">Retur & Refusjon</h1>
        <p className="rsub">Oppdatert mai 2026</p>

        <div className="rsection">
          <h2 className="rsection-title">14 dagers angrerett</h2>
          <p>Du har 14 dagers angrerett fra du mottar varen, i henhold til angrerettloven. Du trenger ikke oppgi noen grunn.</p>
          <p>Slik benytter du angreretten:</p>
          <p>1. Fyll ut <a href="/angreskjema" style={{ color: '#1D9E75' }}>standardskjema for angrerett</a>.</p>
          <p>2. Send skjemaet til <strong>contact.fjordfur@gmail.com</strong> innen 14 dager etter at du mottok varen.</p>
          <p>Vi refunderer hele kjøpesummen uten at du trenger å sende varen tilbake.</p>
        </div>

        <div className="rsection">
          <h2 className="rsection-title">Reklamasjon (2 år)</h2>
          <p>Du har 2 års reklamasjonsrett i henhold til forbrukerkjøpsloven. Mottar du et defekt eller feil produkt, kontakt oss på <strong>contact.fjordfur@gmail.com</strong> med bilde av produktet.</p>
          <p>Vi sender deg et nytt produkt eller refunderer kjøpesummen — helt uten kostnad for deg.</p>
        </div>

        <div className="rsection">
          <h2 className="rsection-title">Refusjon</h2>
          <p>Refusjon utbetales innen 14 dager etter at vi har mottatt angreskjemaet, og tilbakeføres til betalingsmetoden du brukte ved kjøp.</p>
        </div>

        <div className="rsection">
          <h2 className="rsection-title">Kontakt oss</h2>
          <p>Har du spørsmål om retur eller refusjon? Ta kontakt med oss på:</p>
          <p><strong>E-post:</strong> contact.fjordfur@gmail.com</p>
          <p><strong>Svartid:</strong> Vi svarer innen 1-2 virkedager</p>
        </div>
      </div>
    </div>
  );
}