'use client';
import { useLanguage } from '../../lib/useLanguage';

export default function OmOss() {
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
        .hero {
          border-bottom: 1px solid #e8e8e4;
          padding: 80px 48px;
          max-width: 1100px; margin: 0 auto;
        }
        .hero-tag {
          font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
          color: #1D9E75; font-weight: 500; margin-bottom: 20px;
        }
        .hero-h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 52px; font-weight: 600; line-height: 1.1;
          color: #1a1a18; margin-bottom: 24px; max-width: 600px;
        }
        .hero-p {
          font-size: 15px; color: #777; line-height: 1.8;
          max-width: 520px; font-weight: 300;
        }
        .rcontainer { max-width: 1100px; margin: 0 auto; padding: 64px 48px; }
        .grid {
          display: grid; grid-template-columns: 1fr 1fr 1fr;
          gap: 1px; background: #e8e8e4;
          border: 1px solid #e8e8e4; border-radius: 12px;
          overflow: hidden; margin-bottom: 64px;
        }
        .grid-item {
          background: #fafaf8; padding: 32px 28px;
          display: flex; flex-direction: column; gap: 12px;
        }
        .grid-icon { font-size: 24px; }
        .grid-title { font-family: 'Cormorant Garamond', serif; font-size: 20px; font-weight: 600; color: #1a1a18; }
        .grid-text { font-size: 13px; color: #888; line-height: 1.7; font-weight: 300; }
        .story {
          display: grid; grid-template-columns: 1fr 1fr;
          gap: 64px; align-items: center; margin-bottom: 64px;
          padding-bottom: 64px; border-bottom: 1px solid #e8e8e4;
        }
        .story-tag {
          font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
          color: #1D9E75; font-weight: 500; margin-bottom: 16px;
        }
        .story-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px; font-weight: 600; color: #1a1a18;
          margin-bottom: 16px; line-height: 1.2;
        }
        .story-text { font-size: 14px; color: #777; line-height: 1.8; font-weight: 300; }
        .story-img {
          background: #f4f4f0; border-radius: 12px;
          aspect-ratio: 1; display: flex; align-items: center;
          justify-content: center; font-size: 80px;
          border: 1px solid #e8e8e4;
        }
        .cta {
          text-align: center; padding: 64px 48px;
          background: #f4f4f0; border-radius: 12px;
        }
        .cta-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px; font-weight: 600; color: #1a1a18;
          margin-bottom: 16px;
        }
        .cta-text { font-size: 14px; color: #888; margin-bottom: 28px; font-weight: 300; }
        .cta-btn {
          background: #1a1a18; color: #fafaf8;
          border: none; border-radius: 8px;
          padding: 13px 28px; font-size: 14px; font-weight: 500;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          text-decoration: none; display: inline-block;
        }
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

      <div className="hero">
        <p className="hero-tag">{T ? 'About us' : 'Om oss'}</p>
        <h1 className="hero-h1">{T ? 'We love pets as much as you do' : 'Vi elsker kjæledyr like mye som deg'}</h1>
        <p className="hero-p">{T ? 'FjordFur was started by pet owners who wanted to make it easy to find great products at fair prices — delivered straight to your door.' : 'FjordFur ble startet av kjæledyreiere som ville gjøre det enkelt å finne gode produkter til rimelige priser — levert rett hjem til deg i Norge.'}</p>
      </div>

      <div className="rcontainer">
        <div className="grid">
          <div className="grid-item">
            <div className="grid-icon">🐾</div>
            <div className="grid-title">{T ? 'Pets first' : 'Kjæledyr først'}</div>
            <div className="grid-text">{T ? 'We only choose products we would use for our own pets. Quality and animal welfare are always our priority.' : 'Vi velger kun produkter vi selv ville brukt på våre egne kjæledyr. Kvalitet og dyrevelferd er alltid i fokus.'}</div>
          </div>
          <div className="grid-item">
            <div className="grid-icon">💬</div>
            <div className="grid-title">{T ? 'Friendly support' : 'God kundeservice'}</div>
            <div className="grid-text">{T ? 'Questions? Reach us at contact.fjordfur@gmail.com — we respond within 1–2 business days.' : 'Ta kontakt på contact.fjordfur@gmail.com — vi svarer innen 1-2 virkedager.'}</div>
          </div>
          <div className="grid-item">
            <div className="grid-icon">♻️</div>
            <div className="grid-title">{T ? 'Easy shopping' : 'Enkel handel'}</div>
            <div className="grid-text">{T ? '14-day returns, free shipping over NOK 499, and hassle-free refunds. We make online shopping safe and simple.' : '14 dagers angrerett, gratis frakt over 499 kr og enkel refusjon. Vi gjør det trygt og enkelt å handle online.'}</div>
          </div>
        </div>

        <div className="story">
          <div>
            <p className="story-tag">{T ? 'Our story' : 'Vår historie'}</p>
            <h2 className="story-title">{T ? 'Started by pet owners, for pet owners' : 'Startet av kjæledyreiere, for kjæledyreiere'}</h2>
            <p className="story-text">{T ? 'We started FjordFur because we found it hard to find quality pet products at fair prices. Our goal is simple — give pet owners access to the best products, delivered quickly and safely.' : 'Vi startet FjordFur fordi vi selv opplevde det som vanskelig å finne gode kjæledyrprodukter til fornuftige priser i Norge. Målet vårt er enkelt — gi norske kjæledyreiere tilgang til de beste produktene, levert raskt og trygt.'}</p>
          </div>
          <div className="story-img">🐕</div>
        </div>

        <div className="cta">
          <h2 className="cta-title">{T ? 'Ready to shop?' : 'Klar til å handle?'}</h2>
          <p className="cta-text">{T ? 'Explore our range of carefully selected pet products.' : 'Utforsk vårt sortiment av nøye utvalgte kjæledyrprodukter.'}</p>
          <a href="/" className="cta-btn">{T ? 'See all products' : 'Se alle produkter'}</a>
        </div>
      </div>
    </div>
  );
}