'use client';
import { useLanguage } from '../../lib/useLanguage';

export default function Vilkar() {
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
      `}</style>

      <nav className="rnav">
        <a href="/" className="rlogo">Fjord<span>Fur</span></a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{ display: 'flex', gap: '3px', background: '#f0f0ec', borderRadius: '6px', padding: '3px' }}>
            {(['no', 'en'] as const).map(l => (
              <button key={l} onClick={() => setLang(l)} style={{ background: lang === l ? '#1a1a18' : 'transparent', color: lang === l ? '#fafaf8' : '#888', border: 'none', borderRadius: '4px', padding: '4px 9px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif", letterSpacing: '0.06em' }}><img src={l === 'no' ? '/flag-no.svg' : '/flag-gb.svg'} alt={l} style={{ width: '18px', height: '13px', borderRadius: '2px' }} /> {l.toUpperCase()}</button>
            ))}
          </div>
          <a href="/" className="rback">← {T ? 'Back to store' : 'Tilbake til butikken'}</a>
        </div>
      </nav>

      <div className="rcontainer">
        <h1 className="rtitle">{T ? 'Terms & Conditions' : 'Vilkår og betingelser'}</h1>
        <p className="rsub">{T ? 'Updated May 2026' : 'Oppdatert mai 2026'}</p>

        <div className="rsection">
          <h2 className="rsection-title">{T ? 'About FjordFur' : 'Om FjordFur'}</h2>
          <p>{T ? 'FjordFur is a Norwegian online pet supplies store. Org.nr. 930 795 593. Contact: contact.fjordfur@gmail.com. By shopping with us you agree to these terms.' : 'FjordFur er en norsk nettbutikk som selger kjæledyrutstyr. Org.nr. 930 795 593. Kontakt: contact.fjordfur@gmail.com. Ved å handle hos oss godtar du disse vilkårene.'}</p>
        </div>

        <div className="rsection">
          <h2 className="rsection-title">{T ? 'Orders & payment' : 'Bestilling og betaling'}</h2>
          <p>{T ? 'All prices are listed in Norwegian Kroner (NOK). FjordFur is not VAT-registered.' : 'Alle priser er oppgitt i norske kroner (NOK). FjordFur er ikke mva-registrert, og prisene inkluderer ikke merverdiavgift.'}</p>
          <p>{T ? 'Payments are processed securely via Stripe, which supports all major payment cards.' : 'Betaling skjer sikkert via Stripe, som støtter alle vanlige betalingskort.'}</p>
          <p>{T ? 'You will receive an order confirmation by email after completing your purchase.' : 'Du mottar en ordrebekreftelse på e-post etter fullført kjøp.'}</p>
        </div>

        <div className="rsection">
          <h2 className="rsection-title">{T ? 'Delivery' : 'Levering'}</h2>
          <p>{T ? 'We ship worldwide. Estimated delivery time is 2–3 weeks from the order date.' : 'Vi leverer til hele Norge. Estimert leveringstid er 2–3 uker fra bestillingsdato.'}</p>
          <p>{T ? 'Free shipping on all orders over NOK 499. A shipping fee applies to orders below NOK 499.' : 'Gratis frakt på alle ordre over kr 499. Ved ordre under kr 499 beregnes frakt ved kassen.'}</p>
        </div>

        <div className="rsection">
          <h2 className="rsection-title">{T ? 'Returns & right of withdrawal' : 'Angrerett og retur'}</h2>
          <p>{T ? 'You have a 14-day right of withdrawal from the date you receive the item.' : 'Du har 14 dagers angrerett fra mottak av varen, i henhold til angrerettloven.'}</p>
          <p>{T ? <>Fill in the <a href="/angreskjema" style={{ color: '#1D9E75' }}>standard cancellation form</a> and send it to contact.fjordfur@gmail.com within 14 days of receiving the item.</> : <>For å benytte angreretten fyller du ut <a href="/angreskjema" style={{ color: '#1D9E75' }}>standardskjema for angrerett</a> og sender det til contact.fjordfur@gmail.com innen 14 dager etter mottak av varen.</>}</p>
          <p>{T ? 'We will refund the full purchase price. You do not need to return the item. Refunds are processed within 14 days.' : 'Vi refunderer hele kjøpesummen uten at du trenger å sende varen tilbake. Refusjon utbetales innen 14 dager etter at vi har mottatt angreskjemaet.'}</p>
        </div>

        <div className="rsection">
          <h2 className="rsection-title">{T ? 'Complaints' : 'Reklamasjon'}</h2>
          <p>{T ? 'You have a 2-year right to complain. If you receive a defective or incorrect product, contact us at contact.fjordfur@gmail.com with a photo.' : 'Du har 2 års reklamasjonsrett i henhold til forbrukerkjøpsloven. Mottar du et defekt eller feil produkt, kontakt oss på contact.fjordfur@gmail.com med bilde av produktet.'}</p>
          <p>{T ? 'We will send a replacement or issue a full refund at no cost to you.' : 'Vi sender nytt produkt eller refunderer kjøpesummen uten kostnad for deg.'}</p>
        </div>

        <div className="rsection">
          <h2 className="rsection-title">{T ? 'Privacy' : 'Personvern'}</h2>
          <p>{T ? <>We process your personal data in accordance with our <a href="/personvern" style={{ color: '#1D9E75' }}>privacy policy</a>.</> : <>Vi behandler dine personopplysninger i henhold til vår <a href="/personvern" style={{ color: '#1D9E75' }}>personvernerklæring</a>.</>}</p>
        </div>

        <div className="rsection">
          <h2 className="rsection-title">{T ? 'Contact' : 'Kontakt'}</h2>
          <p><strong>{T ? 'Email' : 'E-post'}:</strong> contact.fjordfur@gmail.com</p>
          <p><strong>{T ? 'Response time' : 'Svartid'}:</strong> {T ? 'We respond within 1–2 business days' : 'Vi svarer innen 1–2 virkedager'}</p>
        </div>
      </div>
    </div>
  );
}