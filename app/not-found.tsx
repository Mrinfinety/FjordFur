import Link from 'next/link';

export default function NotFound() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#f7f7f5', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
      <div style={{ maxWidth: '480px', width: '100%', textAlign: 'center' }}>
        <div style={{ background: '#1a1a18', display: 'inline-block', padding: '16px 28px', borderRadius: '8px', marginBottom: '32px' }}>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: '22px', color: '#ffffff' }}>
            Fjord<span style={{ color: '#1D9E75' }}>Fur</span>
          </span>
        </div>

        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: '64px', color: '#1a1a18', margin: '0 0 8px', lineHeight: 1 }}>404</h1>
        <p style={{ fontSize: '18px', color: '#444', margin: '0 0 8px' }}>Siden finnes ikke</p>
        <p style={{ fontSize: '14px', color: '#888', margin: '0 0 32px' }}>Det kan hende lenken er feil, eller at siden har blitt flyttet.</p>

        <Link
          href="/"
          style={{ display: 'inline-block', background: '#1D9E75', color: '#ffffff', textDecoration: 'none', padding: '14px 32px', borderRadius: '6px', fontSize: '15px', fontWeight: 600 }}
        >
          Tilbake til forsiden
        </Link>
      </div>
    </div>
  );
}
