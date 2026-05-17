'use client';
import { useState, useEffect } from 'react';

const products = [
  { id: 1, name: 'Sakte-forer Skål', sub: 'Forhindrer kvelning, hund/katt', price: 149, margin: 132, emoji: '🥣', cat: 'hund', badge: 'new', cjId: '1653041912300969984' },
  { id: 2, name: 'Vannflaske 2-i-1', sub: 'Med matbeholder, perfekt for turer', price: 249, margin: 120, emoji: '🚰', cat: 'hund', cjId: '2504100230321610200' },
  { id: 3, name: 'Kjølmatte', sub: 'Issilke, ikke-giftig, inne/ute', price: 299, margin: 35, emoji: '❄️', cat: 'hund', badge: 'sale', cjId: '3F8F4862-6CFA-4947-9CE7-EA1936C96840' },
];

const kategorier = ['alle', 'hund', 'katt', 'fugl', 'fisk', 'gnager'];

async function fetchCJProduct(pid: string) {
  const res = await fetch(`/api/products?pid=${pid}`);
  const data = await res.json();
  return data.data;
}

export default function Home() {
  const [aktivKat, setAktivKat] = useState('alle');
  const [handlekurv, setHandlekurv] = useState<{ id: number; name: string }[]>([]);
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

  function leggTil(id: number, name: string) {
    setHandlekurv(prev => [...prev, { id, name }]);
    setToast(name + ' lagt i handlekurven');
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
          display: flex; justify-content: space-between;
          padding: 14px 0; border-bottom: 1px solid #e8e8e4;
          font-size: 14px;
        }
        .drawer-item-name { color: #1a1a18; font-weight: 500; }
        .drawer-empty { color: #aaa; font-size: 14px; margin-top: 16px; font-weight: 300; }
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
      `}</style>

      {/* Navbar */}
      <nav className="nav">
        <div className="logo">Nordic<span>Paws</span></div>
        <div className="nav-links">
          <a onClick={() => setAktivKat('hund')}>Hund</a>
          <a onClick={() => setAktivKat('katt')}>Katt</a>
          <a onClick={() => setAktivKat('fugl')}>Fugl</a>
          <a onClick={() => setAktivKat('fisk')}>Fisk</a>
        </div>
        <div className="nav-right">
          <button className="cart-btn" onClick={() => setKurvAapen(true)}>
            🛒 Handlekurv ({handlekurv.length})
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
            <button className="btn-secondary">Om oss</button>
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
          ? <img src={cjProducts[p.cjId].bigImage} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          : <div style={{ width: '100%', height: '100%', background: '#f4f4f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px' }}>{p.emoji}</div>}
      </div>
      <div className="card-body">
        {p.badge === 'new' && <span className="badge badge-new">Nyhet</span>}
        {p.badge === 'sale' && <span className="badge badge-sale">Tilbud</span>}
        <div className="card-name">{p.name}</div>
        <div className="card-sub">{p.sub}</div>
        <div className="card-footer">
          <span className="price">kr {p.price},–</span>
          <button className="add" onClick={(e) => { e.stopPropagation(); leggTil(p.id, p.name); }}>
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
  <div className="footer-logo">Nordic<span>Paws</span></div>
  <div style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
    <a href="/retur" style={{ fontSize: '13px', color: '#888', textDecoration: 'none' }}>Retur & Refusjon</a>
<a href="/vilkår" style={{ fontSize: '13px', color: '#888', textDecoration: 'none' }}>Vilkår</a>
<a href="/personvern" style={{ fontSize: '13px', color: '#888', textDecoration: 'none' }}>Personvern</a>
    <div className="footer-text">© 2026 NordicPaws. Alle rettigheter forbeholdt.</div>
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
            {handlekurv.length === 0 ? (
              <p className="drawer-empty">Handlekurven er tom.</p>
            ) : (
              handlekurv.map((item, i) => {
                const p = products.find(x => x.id === item.id)!;
                return (
                  <div key={i} className="drawer-item">
                    <span className="drawer-item-name">{item.name}</span>
                    <span style={{ color: '#888', fontSize: '14px' }}>kr {p.price},–</span>
                  </div>
                );
              })
            )}
            <div className="drawer-total">
              <div className="drawer-total-row">
                <span>Totalt</span>
                <span>kr {handlekurv.reduce((sum, item) => {
                  const p = products.find(x => x.id === item.id)!;
                  return sum + p.price;
                }, 0)},–</span>
              </div>
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
        items: handlekurv.map(item => {
          const p = products.find(x => x.id === item.id)!;
          return { name: item.name, price: p.price, quantity: 1 };
        }),
      }),
    });
    const data = await res.json();
    if (data.url) {
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