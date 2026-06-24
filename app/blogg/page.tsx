'use client';
import { ARTIKLER } from '../../lib/blogg';

export default function BloggOversikt() {
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
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: 20px;
        }
        .blog-card {
          background: #fff; cursor: pointer;
          display: flex; flex-direction: column;
          border: 1px solid #e8e8e4; border-radius: 12px;
          overflow: hidden; text-decoration: none;
          transition: all 0.2s;
        }
        .blog-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); border-color: #d4d4ce; }
        .blog-card-img {
          height: 180px; background: #f4f4f0;
          display: flex; align-items: center; justify-content: center;
          font-size: 64px;
        }
        .blog-card-body { padding: 24px; display: flex; flex-direction: column; gap: 10px; flex: 1; }
        .blog-card-meta { font-size: 12px; color: #aaa; letter-spacing: 0.02em; }
        .blog-card-title {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px; font-weight: 600; color: #1a1a18; line-height: 1.25;
        }
        .blog-card-ingress { font-size: 14px; color: #888; line-height: 1.7; font-weight: 300; flex: 1; }
        .blog-card-link { font-size: 13px; color: #1D9E75; font-weight: 500; margin-top: 4px; }
        @media (max-width: 768px) {
          .rnav { padding: 0 20px; }
          .hero { padding: 56px 20px; }
          .hero-h1 { font-size: 38px; }
          .rcontainer { padding: 40px 20px; }
          .blog-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <nav className="rnav">
        <a href="/" className="rlogo">Fjord<span>Fur</span></a>
        <a href="/" className="rback">← Tilbake til butikken</a>
      </nav>

      <div className="hero">
        <p className="hero-tag">Blogg</p>
        <h1 className="hero-h1">Tips og råd for en bedre hverdag med kjæledyret</h1>
        <p className="hero-p">Guider, gode råd og inspirasjon for deg med hund og katt — skrevet av kjæledyreiere, for kjæledyreiere.</p>
      </div>

      <div className="rcontainer">
        <div className="blog-grid">
          {ARTIKLER.map(a => (
            <a key={a.slug} href={`/blogg/${a.slug}`} className="blog-card">
              <div className="blog-card-img">{a.emoji}</div>
              <div className="blog-card-body">
                <span className="blog-card-meta">{a.dato} · {a.lesetid} lesing</span>
                <h2 className="blog-card-title">{a.tittel}</h2>
                <p className="blog-card-ingress">{a.ingress}</p>
                <span className="blog-card-link">Les artikkelen →</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
