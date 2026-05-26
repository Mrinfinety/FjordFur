'use client';
import { useLanguage } from '../../lib/useLanguage';

export default function Takk() {
  const { lang, setLang } = useLanguage();
  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      background: '#fafaf8',
      gap: '16px'
    }}>
      <div style={{ fontSize: '48px' }}>🐾</div>
      <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '36px', fontWeight: 600, color: '#1a1a18' }}>
        {lang === 'en' ? 'Thank you for your order!' : 'Takk for bestillingen!'}
      </h1>
      <p style={{ fontSize: '15px', color: '#888', maxWidth: '400px', textAlign: 'center', lineHeight: 1.7 }}>
        {lang === 'en'
          ? 'We have received your order and are processing it now. Estimated delivery time is 2–3 weeks. You will receive tracking information by email once your parcel has been shipped.'
          : 'Vi har mottatt bestillingen din og behandler den nå. Estimert leveringstid er 2–3 uker. Du vil motta sporingsinfo på e-post når pakken er sendt.'}
      </p>
      <div style={{ display: 'flex', gap: '12px', marginTop: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <a href="/sporing" style={{ background: '#1D9E75', color: '#fafaf8', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>
          {lang === 'en' ? 'Track your order' : 'Spor bestillingen'}
        </a>
        <a href="/" style={{ background: '#1a1a18', color: '#fafaf8', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontSize: '14px', fontWeight: 500 }}>
          {lang === 'en' ? 'Back to store' : 'Tilbake til butikken'}
        </a>
      </div>
    </div>
  );
}