'use client';
import { useState, useEffect } from 'react';

export default function CookieBanner() {
  const [synlig, setSynlig] = useState(false);

  useEffect(() => {
    const godtatt = localStorage.getItem('cookies-godtatt');
    if (!godtatt) setSynlig(true);
  }, []);

  function godta() {
    localStorage.setItem('cookies-godtatt', 'ja');
    setSynlig(false);
  }

  if (!synlig) return null;

  return (
    <div style={{
      position: 'fixed', bottom: '24px', left: '50%',
      transform: 'translateX(-50%)',
      background: '#1a1a18', color: '#fafaf8',
      padding: '16px 24px', borderRadius: '12px',
      display: 'flex', alignItems: 'center', gap: '24px',
      fontFamily: "'DM Sans', sans-serif",
      fontSize: '13px', zIndex: 9999,
      maxWidth: '560px', width: 'calc(100% - 48px)',
      boxShadow: '0 4px 24px rgba(0,0,0,0.15)'
    }}>
      <p style={{ color: '#ccc', lineHeight: 1.6, flex: 1 }}>
        Vi bruker nødvendige informasjonskapsler for at butikken skal fungere. Les mer i vår{' '}
        <a href="/personvern" style={{ color: '#1D9E75', textDecoration: 'none' }}>personvernerklæring</a>.
      </p>
      <button onClick={godta} style={{
        background: '#1D9E75', color: '#fafaf8',
        border: 'none', borderRadius: '8px',
        padding: '10px 20px', fontSize: '13px',
        fontWeight: 500, cursor: 'pointer',
        fontFamily: "'DM Sans', sans-serif",
        whiteSpace: 'nowrap'
      }}>
        Godta
      </button>
    </div>
  );
}