export default function Takk() {
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
      <h1 style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: '36px',
        fontWeight: 600,
        color: '#1a1a18'
      }}>
        Takk for bestillingen!
      </h1>
      <p style={{ fontSize: '15px', color: '#888', maxWidth: '400px', textAlign: 'center', lineHeight: 1.7 }}>
        Vi har mottatt bestillingen din og sender deg en bekreftelse på e-post. Leveringstid er 1–3 virkedager.
      </p>
      <a href="/" style={{
        marginTop: '16px',
        background: '#1a1a18',
        color: '#fafaf8',
        padding: '12px 28px',
        borderRadius: '8px',
        textDecoration: 'none',
        fontSize: '14px',
        fontWeight: 500
      }}>
        Tilbake til butikken
      </a>
    </div>
  );
}