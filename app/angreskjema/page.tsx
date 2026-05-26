'use client';
import { useLanguage } from '../../lib/useLanguage';

export default function Angreskjema() {
  const { lang, setLang } = useLanguage();
  const T = lang === 'en';
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
        <a href="/" className="rlogo">Fjord<span>Fur</span></a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '3px', background: '#f0f0ec', borderRadius: '6px', padding: '3px' }}>
            {(['no', 'en'] as const).map(l => (
              <button key={l} onClick={() => setLang(l)} style={{ background: lang === l ? '#1a1a18' : 'transparent', color: lang === l ? '#fafaf8' : '#888', border: 'none', borderRadius: '4px', padding: '4px 9px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.06em' }}><img src={l === 'no' ? '/flag-no.svg' : '/flag-gb.svg'} alt={l} style={{ width: '18px', height: '13px', borderRadius: '2px' }} /> {l.toUpperCase()}</button>
            ))}
          </div>
          <a href="/retur" className="rback">← {T ? 'Returns & Refunds' : 'Retur & Refusjon'}</a>
        </div>
      </nav>

      <div className="rcontainer">
        <h1 className="rtitle">{T ? 'Cancellation Form' : 'Standardskjema for angrerett'}</h1>
        <p className="rsub">{T ? 'Standard withdrawal form' : 'I henhold til angrerettloven vedlegg 1'}</p>

        <div className="rsection">
          <h2 className="rsection-title">{T ? 'How to use this form' : 'Slik bruker du skjemaet'}</h2>
          <p>{T ? <>Fill in the form below and send it to <strong>contact.fjordfur@gmail.com</strong> within 14 days of receiving your item. You can also print the form.</> : <>Fyll ut skjemaet nedenfor og send det til <strong>contact.fjordfur@gmail.com</strong> innen 14 dager etter at du mottok varen. Du kan også skrive ut skjemaet og sende det per post.</>}</p>
          <p>{T ? 'You do not need to return the item. We will refund the full purchase price within 14 days of receiving this form.' : 'Du trenger ikke sende varen tilbake. Vi refunderer hele kjøpesummen innen 14 dager etter at vi har mottatt skjemaet.'}</p>
        </div>

        <div className="rsection">
          <div className="skjema">
            <div className="skjema-tittel">{T ? 'Standard cancellation / right of withdrawal form' : 'Standardskjema for bruk av angrerett'}</div>

            <p>{T ? 'To: FjordFur, contact.fjordfur@gmail.com' : 'Til: FjordFur, contact.fjordfur@gmail.com'}</p>

            <span className="skjema-label">{T ? 'I hereby give notice that I wish to withdraw from my purchase of:' : 'Jeg meddeler herved at jeg ønsker å benytte angreretten for kjøp av:'}</span>
            <span className="skjema-felt" />

            <span className="skjema-label">{T ? 'Ordered on:' : 'Bestilt den:'}</span>
            <span className="skjema-felt" />

            <span className="skjema-label">{T ? 'Received on:' : 'Mottatt den:'}</span>
            <span className="skjema-felt" />

            <span className="skjema-label">{T ? 'Name:' : 'Navn:'}</span>
            <span className="skjema-felt" />

            <span className="skjema-label">{T ? 'Address:' : 'Adresse:'}</span>
            <span className="skjema-felt" />
            <span className="skjema-felt" />

            <span className="skjema-label">{T ? 'Email address:' : 'E-postadresse:'}</span>
            <span className="skjema-felt" />

            <span className="skjema-label">{T ? 'Date:' : 'Dato:'}</span>
            <span className="skjema-felt" />

            <p className="merknad">{T ? 'Signature is not required when submitting by email.' : 'Underskrift er ikke nødvendig ved innsending per e-post.'}</p>
          </div>

          <button className="print-btn" onClick={() => typeof window !== 'undefined' && window.print()}>
            {T ? 'Print form' : 'Skriv ut skjema'}
          </button>
        </div>
      </div>
    </div>
  );
}
