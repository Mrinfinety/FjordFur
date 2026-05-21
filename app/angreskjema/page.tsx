export default function Angreskjema() {
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
        .skjema {
          background: #f4f4f0; border: 1px solid #e8e8e4;
          border-radius: 12px; padding: 32px;
          font-size: 14px; color: #1a1a18; line-height: 2;
        }
        .skjema-tittel {
          font-family: 'Cormorant Garamond', serif;
          font-size: 20px; font-weight: 600; margin-bottom: 20px; color: #1a1a18;
        }
        .skjema-felt {
          border-bottom: 1px solid #ccc;
          min-height: 28px; margin-bottom: 4px;
          display: block; width: 100%;
        }
        .skjema-label { font-size: 13px; color: #888; margin-top: 16px; margin-bottom: 2px; display: block; }
        .merknad { font-size: 12px; color: #aaa; margin-top: 20px; font-style: italic; }
        .print-btn {
          margin-top: 24px;
          background: #1a1a18; color: #fafaf8;
          border: none; border-radius: 8px;
          padding: 12px 24px; font-size: 13px; font-weight: 500;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
        }
        .print-btn:hover { background: #1D9E75; }
        @media print { .rnav, .print-btn, .rsection:first-of-type { display: none; } }
      `}</style>

      <nav className="rnav">
        <a href="/" className="rlogo">Nordic<span>Paws</span></a>
        <a href="/retur" className="rback">← Retur & Refusjon</a>
      </nav>

      <div className="rcontainer">
        <h1 className="rtitle">Standardskjema for angrerett</h1>
        <p className="rsub">I henhold til angrerettloven vedlegg 1</p>

        <div className="rsection">
          <h2 className="rsection-title">Slik bruker du skjemaet</h2>
          <p>Fyll ut skjemaet nedenfor og send det til <strong>kontakt.nordicpaws@gmail.com</strong> innen 14 dager etter at du mottok varen. Du kan også skrive ut skjemaet og sende det per post.</p>
          <p>Du trenger ikke sende varen tilbake. Vi refunderer hele kjøpesummen innen 14 dager etter at vi har mottatt skjemaet.</p>
        </div>

        <div className="rsection">
          <div className="skjema">
            <div className="skjema-tittel">Standardskjema for bruk av angrerett</div>

            <p>Til: NordicPaws, kontakt.nordicpaws@gmail.com</p>

            <span className="skjema-label">Jeg meddeler herved at jeg ønsker å benytte angreretten for kjøp av:</span>
            <span className="skjema-felt" />

            <span className="skjema-label">Bestilt den:</span>
            <span className="skjema-felt" />

            <span className="skjema-label">Mottatt den:</span>
            <span className="skjema-felt" />

            <span className="skjema-label">Navn:</span>
            <span className="skjema-felt" />

            <span className="skjema-label">Adresse:</span>
            <span className="skjema-felt" />
            <span className="skjema-felt" />

            <span className="skjema-label">E-postadresse:</span>
            <span className="skjema-felt" />

            <span className="skjema-label">Dato:</span>
            <span className="skjema-felt" />

            <p className="merknad">Underskrift er ikke nødvendig ved innsending per e-post.</p>
          </div>

          <button className="print-btn" onClick={() => typeof window !== 'undefined' && window.print()}>
            Skriv ut skjema
          </button>
        </div>
      </div>
    </div>
  );
}
