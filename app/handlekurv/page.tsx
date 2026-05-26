'use client';
import { useState, useEffect } from 'react';

export default function HandlekurvSide() {
  const [handlekurv, setHandlekurv] = useState<{ id: number; name: string; price: number; cjId: string; variantId: string; quantity: number }[]>([]);
  const [betaler, setBetaler] = useState(false);

  useEffect(() => {
    try {
      const lagret = localStorage.getItem('fjordfur-cart');
      if (lagret) setHandlekurv(JSON.parse(lagret).map((i: any) => ({ ...i, quantity: i.quantity || 1 })));
    } catch {}
  }, []);

  function oppdater(neste: typeof handlekurv) {
    setHandlekurv(neste);
    localStorage.setItem('fjordfur-cart', JSON.stringify(neste));
  }

  function fjern(idx: number) {
    oppdater(handlekurv.filter((_, i) => i !== idx));
  }

  function endreAntall(idx: number, delta: number) {
    const neste = handlekurv.map((item, i) => {
      if (i !== idx) return item;
      return { ...item, quantity: Math.max(1, item.quantity + delta) };
    });
    oppdater(neste);
  }

  const subtotal = handlekurv.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const frakt = subtotal >= 499 ? 0 : 99;
  const total = subtotal + frakt;

  async function gaTilBetaling() {
    if (handlekurv.length === 0) return;
    setBetaler(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: handlekurv.map(item => ({ name: item.name, price: item.price, quantity: item.quantity, cjId: item.cjId, variantId: item.variantId })) }),
      });
      const data = await res.json();
      if (data.url) {
        localStorage.removeItem('fjordfur-cart');
        window.location.href = data.url;
      } else {
        alert('Feil: ' + JSON.stringify(data));
        setBetaler(false);
      }
    } catch (err) {
      alert('Noe gikk galt: ' + err);
      setBetaler(false);
    }
  }

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#fafaf8', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .nav {
          position: sticky; top: 0; z-index: 100;
          background: rgba(250,250,248,0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid #e8e8e4;
          padding: 0 48px; height: 64px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .logo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 600; color: #1a1a18; text-decoration: none;
        }
        .logo span { color: #1D9E75; }
        .back { font-size: 13px; color: #666; text-decoration: none; }
        .back:hover { color: #1a1a18; }

        .container { max-width: 1000px; margin: 0 auto; padding: 48px; }

        .page-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px; font-weight: 600; color: #1a1a18; margin-bottom: 32px;
        }

        .layout { display: grid; grid-template-columns: 1fr 340px; gap: 32px; align-items: start; }

        .items-box {
          border: 1px solid #e8e8e4; border-radius: 12px; overflow: hidden;
        }
        .item-row {
          display: flex; align-items: center; gap: 16px;
          padding: 20px 24px; border-bottom: 1px solid #e8e8e4;
          background: #fafaf8;
        }
        .item-row:last-child { border-bottom: none; }
        .item-name { font-size: 15px; font-weight: 500; color: #1a1a18; flex: 1; }
        .item-price { font-size: 14px; color: #888; min-width: 80px; text-align: right; }
        .qty-ctrl { display: flex; align-items: center; gap: 10px; }
        .qty-btn {
          width: 28px; height: 28px; border-radius: 6px;
          border: 1px solid #d4d4ce; background: transparent;
          cursor: pointer; font-size: 16px; color: #1a1a18;
          display: flex; align-items: center; justify-content: center;
          transition: all 0.15s;
        }
        .qty-btn:hover { background: #1a1a18; color: #fafaf8; border-color: #1a1a18; }
        .qty-num { font-size: 14px; font-weight: 500; min-width: 20px; text-align: center; }
        .remove-btn {
          background: none; border: none; color: #ccc; cursor: pointer;
          font-size: 18px; line-height: 1; padding: 0; transition: color 0.15s;
        }
        .remove-btn:hover { color: #e05555; }

        .empty-box {
          border: 1px solid #e8e8e4; border-radius: 12px;
          padding: 64px 32px; text-align: center;
        }
        .empty-icon { font-size: 48px; margin-bottom: 16px; }
        .empty-text { font-size: 15px; color: #888; margin-bottom: 24px; font-weight: 300; }
        .btn-shop {
          display: inline-block; background: #1a1a18; color: #fafaf8;
          border: none; border-radius: 8px; padding: 12px 28px;
          font-size: 14px; font-weight: 500; cursor: pointer;
          font-family: 'DM Sans', sans-serif; text-decoration: none;
          transition: background 0.2s;
        }
        .btn-shop:hover { background: #1D9E75; }

        .summary-box {
          border: 1px solid #e8e8e4; border-radius: 12px;
          padding: 28px; background: #fafaf8;
          display: flex; flex-direction: column; gap: 16px;
        }
        .summary-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 600; color: #1a1a18;
        }
        .summary-row {
          display: flex; justify-content: space-between;
          font-size: 14px; color: #666;
        }
        .summary-divider { height: 1px; background: #e8e8e4; }
        .summary-total {
          display: flex; justify-content: space-between;
          font-size: 16px; font-weight: 600; color: #1a1a18;
        }
        .btn-pay {
          width: 100%; background: #1D9E75; color: #fafaf8;
          border: none; border-radius: 8px; padding: 15px;
          font-size: 15px; font-weight: 500; cursor: pointer;
          font-family: 'DM Sans', sans-serif; transition: background 0.2s;
        }
        .btn-pay:hover { background: #178a65; }
        .btn-pay:disabled { background: #aaa; cursor: not-allowed; }
        .frakt-info { font-size: 12px; color: #1D9E75; text-align: center; }

        @media (max-width: 768px) {
          .nav { padding: 0 20px; }
          .container { padding: 24px 20px; }
          .layout { grid-template-columns: 1fr; }
          .item-row { flex-wrap: wrap; gap: 12px; }
        }
      `}</style>

      <nav className="nav">
        <a href="/" className="logo">Fjord<span>Fur</span></a>
        <a href="/" className="back">← Fortsett å handle</a>
      </nav>

      <div className="container">
        <h1 className="page-title">Handlekurv</h1>

        {handlekurv.length === 0 ? (
          <div className="empty-box">
            <div className="empty-icon">🛒</div>
            <p className="empty-text">Handlekurven din er tom</p>
            <a href="/" className="btn-shop">Se alle produkter</a>
          </div>
        ) : (
          <div className="layout">
            <div className="items-box">
              {handlekurv.map((item, i) => (
                <div key={i} className="item-row">
                  <div className="item-name">{item.name}</div>
                  <div className="qty-ctrl">
                    <button className="qty-btn" onClick={() => endreAntall(i, -1)}>−</button>
                    <span className="qty-num">{item.quantity}</span>
                    <button className="qty-btn" onClick={() => endreAntall(i, 1)}>+</button>
                  </div>
                  <div className="item-price">kr {item.price * item.quantity},–</div>
                  <button className="remove-btn" onClick={() => fjern(i)}>×</button>
                </div>
              ))}
            </div>

            <div className="summary-box">
              <div className="summary-title">Oppsummering</div>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>kr {subtotal},–</span>
              </div>
              <div className="summary-row">
                <span>Frakt</span>
                <span>{frakt === 0 ? 'Gratis' : `kr ${frakt},–`}</span>
              </div>
              <div className="summary-divider" />
              <div className="summary-total">
                <span>Totalt</span>
                <span>kr {total},–</span>
              </div>
              {frakt > 0 && (
                <p className="frakt-info">Handle for kr {499 - subtotal},– til for gratis frakt</p>
              )}
              <button className="btn-pay" onClick={gaTilBetaling} disabled={betaler}>
                {betaler ? 'Sender til betaling...' : 'Gå til betaling'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
