'use client';
import { useState, useEffect } from 'react';

const products = [
  { id: 1, name: 'Sakte-forer Skål', sub: 'Forhindrer kvelning, hund/katt', price: 149, margin: 132, bildIndex: 1, emoji: '🥣', cat: 'hund', cjId: '1653041912300969984' },
  { id: 2, name: 'Vannflaske 2-i-1', sub: 'Med matbeholder, perfekt for turer', price: 249, margin: 120, emoji: '🚰', cat: 'hund', cjId: '2504100230321610200' },
];

const kategorier = ['alle', 'hund', 'katt', 'fugl', 'fisk', 'gnager'];

async function fetchCJProduct(pid: string) {
  const res = await fetch(`/api/products?pid=${pid}`);
  const data = await res.json();
  return data.data;
}

export default function Home() {
  const [aktivKat, setAktivKat] = useState('alle');
  const [handlekurv, setHandlekurv] = useState<{ id: number; name: string; price: number; cjId: string; variantId: string; quantity: number }[]>([]);

  useEffect(() => {
    try {
      const lagret = localStorage.getItem('fjordfur-cart');
      if (lagret) {
        const parsed = JSON.parse(lagret);
        // Migrer gamle cart-items som mangler quantity-felt
        setHandlekurv(parsed.map((i: any) => ({ ...i, quantity: i.quantity || 1 })));
      }
    } catch {}
  }, []);
  const [toast, setToast] = useState('');
  const [kurvaapen, setKurvAapen] = useState(false);
  const [cjProducts, setCjProducts] = useState<Record<string, any>>({});

useEffect(() => {
  const cjIds = products.filter(p => p.cjId).map(p => p.cjId!);
  
  // Last fra cache først
  const cached: Record<string, any> = {};
  cjIds.forEach(pid => {
    const c = sessionStorage.getItem(`cj_${pid}`);
    if (c) cached[pid] = JSON.parse(c);
  });
  if (Object.keys(cached).length > 0) setCjProducts(cached);

  // Hent fra API for de som mangler
  const mangler = cjIds.filter(pid => !cached[pid]);
  if (mangler.length === 0) return;

  Promise.all(
    mangler.map(async (pid) => {
      const data = await fetchCJProduct(pid);
      if (data) sessionStorage.setItem(`cj_${pid}`, JSON.stringify(data));
      return { pid, data };
    })
  ).then(results => {
    const newProducts: Record<string, any> = { ...cached };
    results.forEach(({ pid, data }) => {
      if (data) newProducts[pid] = data;
    });
    setCjProducts(newProducts);
  });
}, []);

  const filtrerte = aktivKat === 'alle' ? products : products.filter(p => p.cat === aktivKat);

  function leggTil(p: typeof products[0]) {
    const variant = cjProducts[p.cjId]?.variants?.[0];
    if (!variant?.vid) {
      setToast('Laster produktinfo, prøv igjen om et sekund...');
      setTimeout(() => setToast(''), 2500);
      return;
    }
    setHandlekurv(prev => {
      const eksisterende = prev.findIndex(i => i.variantId === variant.vid);
      if (eksisterende !== -1) {
        const neste = prev.map((i, idx) =>
          idx === eksisterende ? { ...i, quantity: (i.quantity || 1) + 1 } : i
        );
        localStorage.setItem('fjordfur-cart', JSON.stringify(neste));
        return neste;
      }
      const item = { id: p.id, name: p.name, price: p.price, cjId: p.cjId, variantId: variant.vid, quantity: 1 };
      const neste = [...prev, item];
      localStorage.setItem('fjordfur-cart', JSON.stringify(neste));
      return neste;
    });
    setToast(p.name + ' lagt i handlekurven');
    setTimeout(() => setToast(''), 2500);
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #fafaf8; color: #1a1a18; }

        .nav {
          position: sticky; top: 0; z-index: 100;
          background: rgba(250,250,248,0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid #e8e8e4;
          padding: 0 48px;
          display: flex; align-items: center; justify-content: space-between;
          height: 64px;
        }
        .logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 600; letter-spacing: 0.3px;
          color: #1a1a18;
        }
        .logo span { color: #1D9E75; }
        .nav-links { display: flex; gap: 28px; }
        .nav-links a {
          font-size: 13px; color: #666; cursor: pointer;
          text-decoration: none; letter-spacing: 0.02em;
          transition: color 0.2s;
        }
        .nav-links a:hover { color: #1a1a18; }
        .nav-right { display: flex; gap: 12px; align-items: center; }
        .cart-btn {
          display: flex; align-items: center; gap: 8px;
          background: #1a1a18; color: #fafaf8;
          border: none; border-radius: 8px;
          padding: 9px 18px; font-size: 13px; font-weight: 500;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: background 0.2s;
        }
        .cart-btn:hover { background: #1D9E75; }

        .hero {
          display: grid; grid-template-columns: 1fr 1fr;
          min-height: 520px; border-bottom: 1px solid #e8e8e4;
        }
        .hero-left {
          padding: 80px 48px;
          display: flex; flex-direction: column; justify-content: center;
          border-right: 1px solid #e8e8e4;
        }
        .hero-tag {
          font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase;
          color: #1D9E75; font-weight: 500; margin-bottom: 20px;
        }
        .hero-h1 {
          font-family: 'Cormorant Garamond', serif;
          font-size: 56px; font-weight: 600; line-height: 1.1;
          color: #1a1a18; margin-bottom: 20px; letter-spacing: -0.5px;
        }
        .hero-p {
          font-size: 15px; color: #777; line-height: 1.7;
          margin-bottom: 36px; max-width: 340px; font-weight: 300;
        }
        .hero-btns { display: flex; gap: 12px; }
        .btn-primary {
          background: #1a1a18; color: #fafaf8;
          border: none; border-radius: 8px;
          padding: 13px 28px; font-size: 14px; font-weight: 500;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: background 0.2s;
        }
        .btn-primary:hover { background: #1D9E75; }
        .btn-secondary {
          background: transparent; color: #1a1a18;
          border: 1px solid #d4d4ce; border-radius: 8px;
          padding: 13px 28px; font-size: 14px; font-weight: 500;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: all 0.2s;
        }
        .btn-secondary:hover { border-color: #1a1a18; }

        .hero-right {
          padding: 80px 48px;
          display: flex; flex-direction: column;
          justify-content: center; gap: 0;
          background: #f4f4f0;
        }
        .stat-row {
          padding: 28px 0;
          border-bottom: 1px solid #e0e0da;
        }
        .stat-row:first-child { padding-top: 0; }
        .stat-row:last-child { border-bottom: none; padding-bottom: 0; }
        .stat-num {
          font-family: 'Cormorant Garamond', serif;
          font-size: 42px; font-weight: 600; color: #1a1a18;
          line-height: 1; margin-bottom: 6px;
        }
        .stat-label { font-size: 13px; color: #888; font-weight: 300; }

        .main { max-width: 1200px; margin: 0 auto; padding: 56px 48px; }

        .section-header {
          display: flex; align-items: baseline;
          justify-content: space-between; margin-bottom: 28px;
        }
        .section-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 28px; font-weight: 600; color: #1a1a18;
        }

        .cats { display: flex; gap: 8px; margin-bottom: 36px; flex-wrap: wrap; }
        .cat {
          padding: 7px 18px; border-radius: 99px;
          border: 1px solid #d4d4ce;
          font-size: 13px; cursor: pointer;
          background: transparent; color: #666;
          font-family: 'DM Sans', sans-serif;
          transition: all 0.2s; letter-spacing: 0.01em;
        }
        .cat:hover { border-color: #1D9E75; color: #1D9E75; }
        .cat.active { background: #1a1a18; color: #fafaf8; border-color: #1a1a18; }

        .grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1px; background: #e8e8e4;
          border: 1px solid #e8e8e4;
          border-radius: 12px; overflow: hidden;
          margin-bottom: 64px;
        }
        .card {
          background: #fafaf8; cursor: pointer;
          transition: background 0.2s;
          display: flex; flex-direction: column;
        }
        .card:hover { background: #f4f4f0; }
        .card-img {
          height: 140px;
          display: flex; align-items: center; justify-content: center;
          font-size: 48px; background: #f4f4f0;
          border-bottom: 1px solid #e8e8e4;
          transition: background 0.2s;
        }
        .card:hover .card-img { background: #eceee8; }
        .card-body { padding: 18px; flex: 1; display: flex; flex-direction: column; }
        .badge {
          display: inline-block; font-size: 10px; font-weight: 500;
          padding: 3px 8px; border-radius: 4px; margin-bottom: 8px;
          letter-spacing: 0.06em; text-transform: uppercase;
        }
        .badge-new { background: #E1F5EE; color: #085041; }
        .badge-sale { background: #FCEBEB; color: #791F1F; }
        .card-name { font-size: 14px; font-weight: 500; margin-bottom: 4px; color: #1a1a18; }
        .card-sub { font-size: 12px; color: #888; margin-bottom: 16px; line-height: 1.5; flex: 1; }
        .card-footer { display: flex; justify-content: space-between; align-items: center; margin-top: auto; }
        .price {
          font-family: 'Cormorant Garamond', serif;
          font-size: 19px; font-weight: 600; color: #1a1a18;
        }
        .add {
          background: transparent; border: 1px solid #d4d4ce;
          color: #666; border-radius: 7px;
          font-size: 12px; padding: 6px 13px;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: all 0.2s;
        }
        .add:hover { background: #1a1a18; color: #fafaf8; border-color: #1a1a18; }

        .trust-strip {
          display: grid; grid-template-columns: repeat(3, 1fr);
          gap: 1px; background: #e8e8e4;
          border: 1px solid #e8e8e4; border-radius: 12px;
          overflow: hidden; margin-bottom: 64px;
        }
        .trust-item {
          background: #fafaf8; padding: 32px 28px;
          display: flex; flex-direction: column; gap: 8px;
        }
        .trust-icon { font-size: 22px; margin-bottom: 4px; }
        .trust-title { font-size: 14px; font-weight: 500; color: #1a1a18; }
        .trust-text { font-size: 13px; color: #888; line-height: 1.6; font-weight: 300; }

        .footer {
          border-top: 1px solid #e8e8e4;
          padding: 40px 48px;
          display: flex; justify-content: space-between; align-items: center;
          max-width: 1200px; margin: 0 auto;
        }
        .footer-logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 18px; font-weight: 600; color: #1a1a18;
        }
        .footer-logo span { color: #1D9E75; }
        .footer-text { font-size: 12px; color: #aaa; }

        .toast-bar {
          position: fixed; bottom: 28px; left: 50%;
          transform: translateX(-50%);
          background: #1a1a18; color: #fafaf8;
          padding: 12px 24px; border-radius: 8px;
          font-size: 13px; font-weight: 500;
          z-index: 999; pointer-events: none;
          animation: slideup 0.25s ease;
        }
        @keyframes slideup {
          from { opacity: 0; transform: translateX(-50%) translateY(12px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }

        .drawer-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.35);
          z-index: 200;
        }
        .drawer {
          position: fixed; top: 0; right: 0;
          width: 380px; height: 100vh;
          background: #fafaf8;
          border-left: 1px solid #e8e8e4;
          z-index: 201; padding: 32px;
          display: flex; flex-direction: column;
          animation: slidein 0.25s ease;
        }
        @keyframes slidein {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
        .drawer-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px; font-weight: 600; margin-bottom: 24px;
          display: flex; justify-content: space-between; align-items: center;
        }
        .drawer-close {
          background: none; border: none; font-size: 22px;
          cursor: pointer; color: #888; line-height: 1;
        }
        .drawer-item {
          display: flex; flex-direction: column; gap: 8px;
          padding: 14px 0; border-bottom: 1px solid #e8e8e4;
        }
        .drawer-item-name { font-size: 14px; color: #1a1a18; font-weight: 500; }
        .drawer-item-row { display: flex; align-items: center; gap: 10px; }
        .drawer-qty-btn {
          width: 26px; height: 26px; border-radius: 6px;
          border: 1px solid #d4d4ce; background: #fff;
          cursor: pointer; font-size: 15px; color: #1a1a18;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.15s;
        }
        .drawer-qty-btn:hover { background: #1a1a18; color: #fafaf8; border-color: #1a1a18; }
        .drawer-qty-num { font-size: 14px; font-weight: 600; color: #1a1a18; min-width: 18px; text-align: center; }
        .drawer-empty { color: #aaa; font-size: 14px; margin-top: 16px; font-weight: 300; }
        .drawer-frakt {
          background: #f4f4f0; border-radius: 8px;
          padding: 12px 14px; margin-bottom: 16px;
        }
        .drawer-frakt-label { font-size: 13px; color: #444; margin-bottom: 8px; line-height: 1.4; }
        .drawer-frakt-label strong { color: #1a1a18; }
        .drawer-frakt-track { height: 5px; background: #e0e0da; border-radius: 99px; overflow: hidden; }
        .drawer-frakt-fill { height: 100%; border-radius: 99px; background: #1D9E75; transition: width 0.4s ease; }
        .drawer-frakt-done { font-size: 13px; color: #1D9E75; font-weight: 500; }
        .drawer-total {
          margin-top: auto; padding-top: 24px;
          border-top: 1px solid #e8e8e4;
        }
        .drawer-total-row {
          display: flex; justify-content: space-between;
          font-size: 15px; font-weight: 500; margin-bottom: 16px;
        }
        .btn-checkout {
          width: 100%; background: #1D9E75; color: #fafaf8;
          border: none; border-radius: 8px;
          padding: 14px; font-size: 14px; font-weight: 500;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
        }

        @media (max-width: 768px) {
          .nav { padding: 0 20px; }
          .nav-links { display: none; }

          .hero { grid-template-columns: 1fr; min-height: auto; }
          .hero-left { padding: 48px 20px; border-right: none; border-bottom: 1px solid #e8e8e4; }
          .hero-h1 { font-size: 38px; }
          .hero-right { padding: 32px 20px; flex-direction: row; flex-wrap: wrap; gap: 0; }
          .stat-row { padding: 16px 0; width: 50%; border-bottom: 1px solid #e0e0da; }
          .stat-row:nth-child(2) { border-bottom: none; }
          .stat-num { font-size: 32px; }

          .main { padding: 36px 20px; }

          .grid { grid-template-columns: repeat(2, 1fr); }
          .card-img { height: 120px; }

          .trust-strip { grid-template-columns: 1fr; }

          .drawer { width: 100vw; border-left: none; padding: 24px 20px; }

          footer { padding: 32px 20px !important; flex-direction: column !important; gap: 16px !important; align-items: flex-start !important; }
        }

        @media (max-width: 400px) {
          .grid { grid-template-columns: 1fr; }
          .hero-h1 { font-size: 32px; }
        }
      `}</style>

      {/* Navbar */}
      <nav className="nav">
        <div className="logo">Fjord<span>Fur</span></div>
        <div className="nav-links">
          <a onClick={() => setAktivKat('hund')}>Hund</a>
          <a onClick={() => setAktivKat('katt')}>Katt</a>
          <a onClick={() => setAktivKat('fugl')}>Fugl</a>
          <a onClick={() => setAktivKat('fisk')}>Fisk</a>
        </div>
        <div className="nav-right">
          <button className="cart-btn" onClick={() => setKurvAapen(true)}>
            🛒 Handlekurv ({handlekurv.reduce((sum, i) => sum + i.quantity, 0)})
          </button>
        </div>
      </nav>

      {/* Hero */}
      <div className="hero">
        <div className="hero-left">
          <p className="hero-tag">Premium kjæledyrutstyr</p>
          <h1 className="hero-h1">Det beste for ditt kjæledyr</h1>
          <p className="hero-p">Nøye utvalgte produkter av høy kvalitet — for hund, katt, fugl og fisk. Rask levering, gratis frakt over 499 kr.</p>
          <div className="hero-btns">
            <button className="btn-primary" onClick={() => document.getElementById('produkter')?.scrollIntoView({ behavior: 'smooth' })}>
              Se alle produkter
            </button>
            <button className="btn-secondary" onClick={() => window.location.href = '/om-oss'}>Om oss</button>
          </div>
        </div>
        <div className="hero-right">
          <div className="stat-row">
            <div className="stat-num">14</div>
<div className="stat-label">Dagers angrerett</div>
          </div>
          <div className="stat-row">
            <div className="stat-num">2–3</div>
<div className="stat-label">Ukers levering</div>
          </div>
          <div className="stat-row">
            <div className="stat-num">Gratis</div>
            <div className="stat-label">Frakt over kr 499</div>
          </div>
        </div>
      </div>

      {/* Produkter */}
      <div className="main">
        <div id="produkter" className="section-header">
          <h2 className="section-title">Produkter</h2>
        </div>

        <div className="cats">
          {kategorier.map(kat => (
            <button
              key={kat}
              className={`cat ${aktivKat === kat ? 'active' : ''}`}
              onClick={() => setAktivKat(kat)}
            >
              {kat.charAt(0).toUpperCase() + kat.slice(1)}
            </button>
          ))}
        </div>

<div className="grid">
  {filtrerte.map(p => (
    <div key={p.id} className="card" onClick={() => p.cjId && window.location.assign(`/produkt/${p.cjId}?pris=${p.price}&margin=${p.margin}`)}>
      <div className="card-img">
        {p.cjId && cjProducts[p.cjId]
          ? <img src={cjProducts[p.cjId].productImageSet?.[(p as any).bildIndex ?? 0] || cjProducts[p.cjId].bigImage} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <div style={{ width: '100%', height: '100%', background: '#f4f4f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px' }}>{p.emoji}</div>}
      </div>
      <div className="card-body">
<div className="card-name">{p.name}</div>
        <div className="card-sub">{p.sub}</div>
        <div className="card-footer">
          <span className="price">kr {p.price},–</span>
          <button className="add" onClick={(e) => { e.stopPropagation(); leggTil(p); }}>
            + Legg til
          </button>
        </div>
      </div>
    </div>
  ))}
</div>

        {/* Tillitsstripe */}
        <div className="trust-strip">
          <div className="trust-item">
            <div className="trust-icon">🚚</div>
            <div className="trust-title">Rask levering</div>
            <div className="trust-text">Leverer i hele Norge på 2–3 uker. Gratis frakt over kr 499.</div>
          </div>
          <div className="trust-item">
            <div className="trust-icon">♻️</div>
            <div className="trust-title">Enkel refusjon</div>
<div className="trust-text">14 dagers angrerett. Vi refunderer uten at du trenger å sende varen tilbake.</div>
          </div>
          <div className="trust-item">
            <div className="trust-icon">🐾</div>
            <div className="trust-title">Ekspertråd</div>
            <div className="trust-text">Alle produkter er testet og godkjent av veterinærer og dyreelskere.</div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #e8e8e4', padding: '40px 48px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
  <div className="footer-logo">Fjord<span>Fur</span></div>
  <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
    <a href="/retur" style={{ fontSize: '13px', color: '#888', textDecoration: 'none' }}>Retur & Refusjon</a>
    <a href="/angreskjema" style={{ fontSize: '13px', color: '#888', textDecoration: 'none' }}>Angreskjema</a>
    <a href="/vilkar" style={{ fontSize: '13px', color: '#888', textDecoration: 'none' }}>Vilkår</a>
    <a href="/personvern" style={{ fontSize: '13px', color: '#888', textDecoration: 'none' }}>Personvern</a>
    <div className="footer-text">© 2026 FjordFur. Alle rettigheter forbeholdt.</div>
  </div>
</footer>

      {/* Toast */}
      {toast && <div className="toast-bar">{toast}</div>}

      {/* Handlekurv-drawer */}
      {kurvaapen && (
        <>
          <div className="drawer-overlay" onClick={() => setKurvAapen(false)} />
          <div className="drawer">
            <div className="drawer-title">
              Handlekurv
              <button className="drawer-close" onClick={() => setKurvAapen(false)}>×</button>
            </div>
            {handlekurv.length > 0 && (() => {
              const sub = handlekurv.reduce((s, i) => s + i.price * i.quantity, 0);
              return (
                <div className="drawer-frakt">
                  {sub >= 499 ? (
                    <p className="drawer-frakt-done">🎉 Du har gratis frakt!</p>
                  ) : (
                    <>
                      <p className="drawer-frakt-label">Handle for <strong>kr {499 - sub},–</strong> til for å få <strong>gratis frakt</strong></p>
                      <div className="drawer-frakt-track">
                        <div className="drawer-frakt-fill" style={{ width: `${Math.min(100, (sub / 499) * 100)}%` }} />
                      </div>
                    </>
                  )}
                </div>
              );
            })()}
            {handlekurv.length === 0 ? (
              <p className="drawer-empty">Handlekurven er tom.</p>
            ) : (
              handlekurv.map((item, i) => (
                <div key={i} className="drawer-item">
                  <span className="drawer-item-name">{item.name}</span>
                  <div className="drawer-item-row">
                    <button className="drawer-qty-btn" onClick={() => setHandlekurv(prev => {
                      const neste = prev.map((x, idx) => idx === i ? { ...x, quantity: Math.max(1, x.quantity - 1) } : x);
                      localStorage.setItem('fjordfur-cart', JSON.stringify(neste));
                      return neste;
                    })}>−</button>
                    <span className="drawer-qty-num">{item.quantity}</span>
                    <button className="drawer-qty-btn" onClick={() => setHandlekurv(prev => {
                      const neste = prev.map((x, idx) => idx === i ? { ...x, quantity: x.quantity + 1 } : x);
                      localStorage.setItem('fjordfur-cart', JSON.stringify(neste));
                      return neste;
                    })}>+</button>
                    <span style={{ marginLeft: 'auto', fontSize: '14px', fontWeight: 500, color: '#1a1a18' }}>kr {item.price * item.quantity},–</span>
                    <button onClick={() => setHandlekurv(prev => {
                      const neste = prev.filter((_, idx) => idx !== i);
                      localStorage.setItem('fjordfur-cart', JSON.stringify(neste));
                      return neste;
                    })} style={{ background: 'none', border: 'none', color: '#ccc', cursor: 'pointer', fontSize: '16px', lineHeight: 1, padding: 0 }}>×</button>
                  </div>
                </div>
              ))
            )}
            <div className="drawer-total">
              <div className="drawer-total-row">
                <span>Totalt</span>
                <span>kr {handlekurv.reduce((sum, item) => sum + item.price * item.quantity, 0)},–</span>
              </div>
              <a href="/handlekurv" style={{ display: 'block', width: '100%', textAlign: 'center', padding: '12px', borderRadius: '8px', border: '1px solid #d4d4ce', color: '#1a1a18', textDecoration: 'none', fontSize: '14px', fontWeight: 500, marginBottom: '10px', fontFamily: "'DM Sans', sans-serif" }}>
                Gå til handlekurv
              </a>
<button className="btn-checkout" onClick={async () => {
  if (handlekurv.length === 0) {
    alert('Handlekurven er tom!');
    return;
  }
  try {
    const res = await fetch('/api/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        items: handlekurv.map(item => ({
          name: item.name,
          price: item.price,
          quantity: item.quantity,
          cjId: item.cjId,
          variantId: item.variantId,
        })),
      }),
    });
    const data = await res.json();
    if (data.url) {
      localStorage.removeItem('fjordfur-cart');
      setHandlekurv([]);
      window.location.href = data.url;
    } else {
      alert('Feil: ' + JSON.stringify(data));
    }
  } catch (err) {
    alert('Noe gikk galt: ' + err);
  }
}}>
  Gå til betaling
</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}