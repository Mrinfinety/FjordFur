'use client';
import { useLanguage } from '../../lib/useLanguage';
import { type Lang } from '../../lib/useLanguage';

function LangToggle({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  return (
    <div style={{ display: 'flex', gap: '3px', background: '#f0f0ec', borderRadius: '6px', padding: '3px' }}>
      {(['no', 'en'] as const).map(l => (
        <button key={l} onClick={() => setLang(l)} style={{ background: lang === l ? '#1a1a18' : 'transparent', color: lang === l ? '#fafaf8' : '#888', border: 'none', borderRadius: '4px', padding: '4px 9px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.06em' }}><img src={l === 'no' ? '/flag-no.svg' : '/flag-gb.svg'} alt={l} style={{ width: '18px', height: '13px', borderRadius: '2px' }} /> {l.toUpperCase()}</button>
      ))}
    </div>
  );
}

export default function Sporing() {
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
          background: rgba(250,250,248,0.92); backdrop-filter: blur(12px);
          border-bottom: 1px solid #e8e8e4;
          padding: 0 48px; height: 64px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .rlogo { font-family: 'Cormorant Garamond', serif; font-size: 28px; font-weight: 600; color: #1a1a18; text-decoration: none; }
        .rlogo span { color: #1D9E75; }
        .rback { font-size: 13px; color: #666; text-decoration: none; }
        .rback:hover { color: #1a1a18; }
        .rcontainer { max-width: 720px; margin: 0 auto; padding: 64px 48px; }
        .rtitle { font-family: 'Cormorant Garamond', serif; font-size: 42px; font-weight: 600; color: #1a1a18; margin-bottom: 8px; }
        .rsub { font-size: 14px; color: #888; margin-bottom: 48px; font-weight: 300; }
        .rsection { margin-bottom: 40px; padding-bottom: 40px; border-bottom: 1px solid #e8e8e4; }
        .rsection:last-child { border-bottom: none; }
        .rsection-title { font-family: 'Cormorant Garamond', serif; font-size: 22px; font-weight: 600; color: #1a1a18; margin-bottom: 16px; }
        .rsection p { font-size: 14px; color: #666; line-height: 1.8; font-weight: 300; margin-bottom: 12px; }
        .steps { display: flex; flex-direction: column; gap: 16px; }
        .step { display: flex; gap: 16px; align-items: flex-start; }
        .step-num { width: 28px; height: 28px; border-radius: 50%; background: #1a1a18; color: #fafaf8; font-size: 13px; font-weight: 600; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 2px; }
        .step-text { font-size: 14px; color: #666; line-height: 1.7; font-weight: 300; }
        .track-btn {
          display: inline-block; margin-top: 24px;
          background: #1D9E75; color: #fafaf8;
          border-radius: 8px; padding: 13px 28px;
          font-size: 14px; font-weight: 500;
          text-decoration: none; font-family: 'DM Sans', sans-serif;
        }
        .track-btn:hover { background: #178a62; }
        .info-box {
          background: #f4f4f0; border: 1px solid #e8e8e4;
          border-radius: 12px; padding: 24px 28px;
          font-size: 14px; color: #666; line-height: 1.8; font-weight: 300;
        }
        .info-box strong { color: #1a1a18; font-weight: 500; }
        @media (max-width: 640px) { .rnav { padding: 0 20px; } .rcontainer { padding: 40px 20px; } }
      `}</style>

      <nav className="rnav">
        <a href="/" className="rlogo">Fjord<span>Fur</span></a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <LangToggle lang={lang} setLang={setLang} />
          <a href="/" className="rback">← {T ? 'Back to store' : 'Tilbake til butikken'}</a>
        </div>
      </nav>

      <div className="rcontainer">
        <h1 className="rtitle">{T ? 'Track your order' : 'Spor din bestilling'}</h1>
        <p className="rsub">{T ? 'Find out where your package is' : 'Finn ut hvor pakken din er'}</p>

        <div className="rsection">
          <h2 className="rsection-title">{T ? 'How to track' : 'Slik sporer du'}</h2>
          <div className="steps">
            <div className="step">
              <div className="step-num">1</div>
              <p className="step-text">{T ? 'Check your order confirmation email — the tracking number is sent as soon as your order is shipped (usually within 3–7 business days).' : 'Sjekk ordrebekreftelsen på e-post — sporingsnummeret sendes så snart bestillingen er sendt (vanligvis innen 3–7 virkedager).'}</p>
            </div>
            <div className="step">
              <div className="step-num">2</div>
              <p className="step-text">{T ? 'Click the link below and enter your tracking number.' : 'Klikk lenken nedenfor og oppgi sporingsnummeret ditt.'}</p>
            </div>
            <div className="step">
              <div className="step-num">3</div>
              <p className="step-text">{T ? 'Tracking updates can take 2–3 days to appear after the package is shipped.' : 'Sporingsoppdateringer kan ta 2–3 dager å dukke opp etter at pakken er sendt.'}</p>
            </div>
          </div>
          <a href="https://www.17track.net/en" target="_blank" rel="noopener noreferrer" className="track-btn">
            {T ? 'Track your package →' : 'Spor pakken din →'}
          </a>
        </div>

        <div className="rsection">
          <h2 className="rsection-title">{T ? 'Estimated delivery time' : 'Estimert leveringstid'}</h2>
          <div className="info-box">
            <p><strong>{T ? 'Norway' : 'Norge'}:</strong> {T ? '2–3 weeks from order date' : '2–3 uker fra bestillingsdato'}</p>
            <p><strong>{T ? 'Rest of Europe' : 'Resten av Europa'}:</strong> {T ? '2–4 weeks' : '2–4 uker'}</p>
            <p><strong>{T ? 'Rest of world' : 'Resten av verden'}:</strong> {T ? '3–5 weeks' : '3–5 uker'}</p>
          </div>
          <p style={{ marginTop: '16px' }}>{T ? 'Delays may occur during peak seasons (November–January). If your order has not arrived after 6 weeks, contact us.' : 'Forsinkelser kan forekomme i høysesong (november–januar). Har ikke bestillingen kommet etter 6 uker, ta kontakt med oss.'}</p>
        </div>

        <div className="rsection">
          <h2 className="rsection-title">{T ? 'Need help?' : 'Trenger du hjelp?'}</h2>
          <p>{T ? 'If you cannot find your tracking number or have questions about your order, contact us:' : 'Finner du ikke sporingsnummeret ditt eller har spørsmål om bestillingen din, kontakt oss:'}</p>
          <p><strong>{T ? 'Email' : 'E-post'}:</strong> contact.fjordfur@gmail.com</p>
          <p>{T ? 'We respond within 1–2 business days.' : 'Vi svarer innen 1–2 virkedager.'}</p>
        </div>
      </div>
    </div>
  );
}
