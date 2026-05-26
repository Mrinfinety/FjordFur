'use client';
import { useLanguage } from '../../lib/useLanguage';

export default function Retur() {
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
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '3px', background: '#f0f0ec', borderRadius: '6px', padding: '3px' }}>
            {(['no', 'en'] as const).map(l => (
              <button key={l} onClick={() => setLang(l)} style={{ background: lang === l ? '#1a1a18' : 'transparent', color: lang === l ? '#fafaf8' : '#888', border: 'none', borderRadius: '4px', padding: '4px 9px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.06em' }}><img src={`https://flagcdn.com/20x15/${l === 'no' ? 'no' : 'gb'}.png`} alt={l} style={{ width: '18px', height: '13px', borderRadius: '2px' }} /> {l.toUpperCase()}</button>
            ))}
          </div>
          <a href="/" className="rback">← {T ? 'Back to store' : 'Tilbake til butikken'}</a>
        </div>
      </nav>

      <div className="rcontainer">
        <h1 className="rtitle">{T ? 'Returns & Refunds' : 'Retur & Refusjon'}</h1>
        <p className="rsub">{T ? 'Updated May 2026' : 'Oppdatert mai 2026'}</p>

        <div className="rsection">
          <h2 className="rsection-title">{T ? '14-day right of withdrawal' : '14 dagers angrerett'}</h2>
          <p>{T ? 'You have a 14-day right of withdrawal from the date you receive the item, in accordance with the Norwegian Right of Withdrawal Act. You do not need to give a reason.' : 'Du har 14 dagers angrerett fra du mottar varen, i henhold til angrerettloven. Du trenger ikke oppgi noen grunn.'}</p>
          <p>{T ? 'How to use your right of withdrawal:' : 'Slik benytter du angreretten:'}</p>
          <p>{T ? <>1. Fill in the <a href="/angreskjema" style={{ color: '#1D9E75' }}>standard cancellation form</a>.</> : <>1. Fyll ut <a href="/angreskjema" style={{ color: '#1D9E75' }}>standardskjema for angrerett</a>.</>}</p>
          <p>{T ? '2. Send the form to contact.fjordfur@gmail.com within 14 days of receiving the item.' : '2. Send skjemaet til contact.fjordfur@gmail.com innen 14 dager etter at du mottok varen.'} <strong>contact.fjordfur@gmail.com</strong></p>
          <p>{T ? 'We will refund the full purchase price — you do not need to return the item.' : 'Vi refunderer hele kjøpesummen uten at du trenger å sende varen tilbake.'}</p>
        </div>

        <div className="rsection">
          <h2 className="rsection-title">{T ? 'Complaints (2 years)' : 'Reklamasjon (2 år)'}</h2>
          <p>{T ? <>You have a 2-year right to complain in accordance with the Norwegian Consumer Purchases Act. If you receive a defective or incorrect product, contact us at <strong>contact.fjordfur@gmail.com</strong> with a photo of the product.</> : <>Du har 2 års reklamasjonsrett i henhold til forbrukerkjøpsloven. Mottar du et defekt eller feil produkt, kontakt oss på <strong>contact.fjordfur@gmail.com</strong> med bilde av produktet.</>}</p>
          <p>{T ? 'We will send you a new product or refund the purchase price — at no cost to you.' : 'Vi sender deg et nytt produkt eller refunderer kjøpesummen — helt uten kostnad for deg.'}</p>
        </div>

        <div className="rsection">
          <h2 className="rsection-title">{T ? 'Refunds' : 'Refusjon'}</h2>
          <p>{T ? 'Refunds are processed within 14 days of receiving the cancellation form, and will be returned to the payment method used at the time of purchase.' : 'Refusjon utbetales innen 14 dager etter at vi har mottatt angreskjemaet, og tilbakeføres til betalingsmetoden du brukte ved kjøp.'}</p>
        </div>

        <div className="rsection">
          <h2 className="rsection-title">{T ? 'Contact us' : 'Kontakt oss'}</h2>
          <p>{T ? 'Questions about returns or refunds? Get in touch:' : 'Har du spørsmål om retur eller refusjon? Ta kontakt med oss på:'}</p>
          <p><strong>{T ? 'Email' : 'E-post'}:</strong> contact.fjordfur@gmail.com</p>
          <p><strong>{T ? 'Response time' : 'Svartid'}:</strong> {T ? 'We respond within 1–2 business days' : 'Vi svarer innen 1-2 virkedager'}</p>
        </div>
      </div>
    </div>
  );
}