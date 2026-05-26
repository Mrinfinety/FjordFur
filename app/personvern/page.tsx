'use client';
import { useLanguage } from '../../lib/useLanguage';

export default function Personvern() {
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
        <h1 className="rtitle">{T ? 'Privacy Policy' : 'Personvernerklæring'}</h1>
        <p className="rsub">{T ? 'Updated May 2026' : 'Oppdatert mai 2026'}</p>

        <div className="rsection">
          <h2 className="rsection-title">{T ? 'Who we are' : 'Hvem er vi'}</h2>
          <p>{T ? 'FjordFur is a Norwegian online pet supplies store. Org.nr. 930 827 525. Contact us at contact.fjordfur@gmail.com for privacy-related questions.' : 'FjordFur er en norsk nettbutikk som selger kjæledyrutstyr. Org.nr. 930 827 525. Kontakt oss på contact.fjordfur@gmail.com ved spørsmål om personvern.'}</p>
        </div>

        <div className="rsection">
          <h2 className="rsection-title">{T ? 'What data we collect' : 'Hvilke data samler vi inn'}</h2>
          <p>{T ? 'When you place an order, we collect:' : 'Når du handler hos oss samler vi inn følgende opplysninger:'}</p>
          <p>— {T ? 'Name and address for delivery' : 'Navn og adresse for levering av varer'}</p>
          <p>— {T ? 'Email address for order confirmation' : 'E-postadresse for ordrebekreftelse'}</p>
          <p>— {T ? 'Payment information is handled by Stripe and is not stored by us' : 'Betalingsinformasjon behandles av Stripe og lagres ikke hos oss'}</p>
        </div>

        <div className="rsection">
          <h2 className="rsection-title">{T ? 'How we use the data' : 'Hvordan bruker vi dataene'}</h2>
          <p>{T ? 'We use your data solely to process and deliver your order. We never sell your personal data to third parties.' : 'Vi bruker opplysningene kun til å behandle og levere din bestilling. Vi selger aldri dine personopplysninger til tredjeparter.'}</p>
          <p>{T ? 'Order data is shared with CJdropshipping solely for the purpose of fulfilling delivery.' : 'Ordredata deles med CJdropshipping utelukkende for å gjennomføre leveringen.'}</p>
        </div>

        <div className="rsection">
          <h2 className="rsection-title">{T ? 'How long we store data' : 'Hvor lenge lagrer vi dataene'}</h2>
          <p>{T ? 'Order data (name, address, email) is stored for 5 years in accordance with Norwegian accounting law.' : 'Ordredata (navn, adresse, e-post) lagres i 5 år i henhold til bokføringsloven.'}</p>
          <p>{T ? 'Other email correspondence is deleted after 3 years.' : 'Øvrige henvendelser via e-post slettes etter 3 år.'}</p>
          <p>{T ? 'You may request deletion of your data at any time by contacting us, unless storage is required by law.' : 'Du kan når som helst be om at dine opplysninger slettes ved å kontakte oss, med mindre lagringen er påkrevd av lov.'}</p>
        </div>

        <div className="rsection">
          <h2 className="rsection-title">{T ? 'Cookies' : 'Informasjonskapsler (cookies)'}</h2>
          <p>{T ? 'We only use strictly necessary cookies required for the store to function. We do not use tracking or advertising cookies.' : 'Vi bruker kun nødvendige informasjonskapsler for at butikken skal fungere. Vi bruker ingen sporings- eller reklamecookies.'}</p>
        </div>

        <div className="rsection">
          <h2 className="rsection-title">{T ? 'Your rights (GDPR)' : 'Dine rettigheter (GDPR)'}</h2>
          <p>{T ? 'You have the right to access, correct, delete and receive a copy of your personal data. You may also object to or request restricted processing.' : 'Du har rett til innsyn i, retting av, sletting av og utlevering av dine personopplysninger. Du kan også protestere mot eller kreve begrenset behandling.'}</p>
          <p>{T ? 'Contact us at contact.fjordfur@gmail.com to exercise these rights. You also have the right to file a complaint with the Norwegian Data Protection Authority (datatilsynet.no).' : 'Ta kontakt på contact.fjordfur@gmail.com for å benytte disse rettighetene. Du har også rett til å klage til Datatilsynet (datatilsynet.no).'}</p>
        </div>

        <div className="rsection">
          <h2 className="rsection-title">{T ? 'Contact' : 'Kontakt'}</h2>
          <p><strong>{T ? 'Email' : 'E-post'}:</strong> contact.fjordfur@gmail.com</p>
          <p><strong>{T ? 'Response time' : 'Svartid'}:</strong> {T ? 'We respond within 1–2 business days' : 'Vi svarer innen 1-2 virkedager'}</p>
        </div>
      </div>
    </div>
  );
}