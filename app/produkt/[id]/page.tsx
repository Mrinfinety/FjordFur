'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function ProduktSide() {
  const { id } = useParams();
  const [produkt, setProdukt] = useState<any>(null);
  const [valgtVariant, setValgtVariant] = useState<any>(null);
  const [laster, setLaster] = useState(true);
  const [beskrivelse, setBeskrivelse] = useState('');

  useEffect(() => {
  fetch(`/api/products?pid=${id}`)
    .then(res => res.json())
    .then(async data => {
      setProdukt(data.data);
      setValgtVariant(data.data?.variants?.[0]);
      setLaster(false);

      // Generer norsk beskrivelse med Claude
      const res = await fetch('/api/beskriv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ produktnavn: data.data?.productNameEn }),
      });
      const aiData = await res.json();
      setBeskrivelse(aiData.beskrivelse || '');
    });
}, [id]);

  if (laster) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'DM Sans, sans-serif' }}>
      Laster produkt...
    </div>
  );

  if (!produkt) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'DM Sans, sans-serif' }}>
      Produkt ikke funnet.
    </div>
  );

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: '#fafaf8', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }

        .pnav {
          position: sticky; top: 0; z-index: 100;
          background: rgba(250,250,248,0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid #e8e8e4;
          padding: 0 48px; height: 64px;
          display: flex; align-items: center; justify-content: space-between;
        }
        .plogo {
          font-family: 'Cormorant Garamond', serif;
          font-size: 22px; font-weight: 600; color: #1a1a18;
          text-decoration: none; cursor: pointer;
        }
        .plogo span { color: #1D9E75; }
        .pback {
          font-size: 13px; color: #666; cursor: pointer;
          text-decoration: none; display: flex; align-items: center; gap: 6px;
        }
        .pback:hover { color: #1a1a18; }

        .pcontainer {
          max-width: 1100px; margin: 0 auto;
          padding: 48px; display: grid;
          grid-template-columns: 1fr 1fr; gap: 64px;
        }

        .pimages { display: flex; flex-direction: column; gap: 12px; }
        .pmain-img {
          width: 100%; aspect-ratio: 1;
          object-fit: cover; border-radius: 12px;
          border: 1px solid #e8e8e4;
        }
        .pthumbs { display: flex; gap: 8px; flex-wrap: wrap; }
        .pthumb {
          width: 64px; height: 64px; object-fit: cover;
          border-radius: 8px; cursor: pointer;
          border: 1px solid #e8e8e4; transition: border-color 0.2s;
        }
        .pthumb:hover { border-color: #1a1a18; }
        .pthumb.active { border-color: #1D9E75; }

        .pinfo { display: flex; flex-direction: column; gap: 24px; padding-top: 8px; }
        .ptag {
          font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase;
          color: #1D9E75; font-weight: 500;
        }
        .ptitle {
          font-family: 'Cormorant Garamond', serif;
          font-size: 36px; font-weight: 600; line-height: 1.2; color: #1a1a18;
        }
        .pprice {
          font-family: 'Cormorant Garamond', serif;
          font-size: 32px; font-weight: 600; color: #1a1a18;
        }
        .pdivider { height: 1px; background: #e8e8e4; }

        .pvariant-label { font-size: 13px; font-weight: 500; color: #1a1a18; margin-bottom: 10px; }
        .pvariants { display: flex; gap: 8px; flex-wrap: wrap; }
        .pvariant {
          padding: 8px 16px; border-radius: 8px;
          border: 1px solid #d4d4ce; font-size: 13px;
          cursor: pointer; background: transparent; color: #666;
          font-family: 'DM Sans', sans-serif; transition: all 0.2s;
        }
        .pvariant:hover { border-color: #1a1a18; color: #1a1a18; }
        .pvariant.active { background: #1a1a18; color: #fafaf8; border-color: #1a1a18; }

        .padd {
          width: 100%; background: #1a1a18; color: #fafaf8;
          border: none; border-radius: 8px; padding: 16px;
          font-size: 15px; font-weight: 500; cursor: pointer;
          font-family: 'DM Sans', sans-serif; transition: background 0.2s;
        }
        .padd:hover { background: #1D9E75; }

        .pdesc {
          font-size: 14px; color: #888; line-height: 1.8; font-weight: 300;
        }
      `}</style>

      <nav className="pnav">
        <a href="/" className="plogo">Nordic<span>Paws</span></a>
        <a href="/" className="pback">← Tilbake til butikken</a>
      </nav>

      <div className="pcontainer">
        <div className="pimages">
          <img
            className="pmain-img"
            src={valgtVariant?.variantImage || produkt.bigImage}
            alt={produkt.productNameEn}
          />
          <div className="pthumbs">
            {produkt.productImageSet?.slice(0, 6).map((img: string, i: number) => (
              <img
                key={i}
                src={img}
                className={`pthumb`}
                alt={`Bilde ${i + 1}`}
              />
            ))}
          </div>
        </div>

        <div className="pinfo">
          <p className="ptag">NordicPaws</p>
          <h1 className="ptitle">
  {produkt.productNameEn
    .replace(/Anti Choking Slow Feeder Dish Bowl Home Dog Eating Plate Anti Gulping Bowl Supplies/g, '')
    .replace(/Pet Dog Cat/g, 'Hund & Katt')
    .trim()}
</h1>
          <p className="pprice">
            kr {Math.max(Math.round(valgtVariant?.variantSellPrice * 10 * 3 / 10) * 10, 149)},–
          </p>
          <div className="pdivider" />

          {produkt.variants?.length > 1 && (
            <div>
              <p className="pvariant-label">Variant</p>
              <div className="pvariants">
                {produkt.variants.map((v: any) => (
                  <button
                    key={v.vid}
                    className={`pvariant ${valgtVariant?.vid === v.vid ? 'active' : ''}`}
                    onClick={() => setValgtVariant(v)}
                  >
                    {v.variantKey
  .replace('Set1', 'Dobbelt sett')
  .replace('Set', 'Enkelt sett')}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button className="padd" onClick={() => {
            alert(produkt.productNameEn + ' lagt i handlekurven!');
            window.location.href = '/';
          }}>
            Legg i handlekurv
          </button>

          <div className="pdivider" />
          {beskrivelse && (
  <p className="pdesc" style={{ lineHeight: '1.8', color: '#555' }}>{beskrivelse}</p>
)}
<div className="pdivider" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
    <span style={{ color: '#1D9E75', fontSize: '16px' }}>✓</span>
    <p className="pdesc">Gratis frakt over kr 499</p>
  </div>
  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
    <span style={{ color: '#1D9E75', fontSize: '16px' }}>✓</span>
    <p className="pdesc">Levering 1–3 virkedager</p>
  </div>
  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
    <span style={{ color: '#1D9E75', fontSize: '16px' }}>✓</span>
    <p className="pdesc">30 dagers returrett</p>
  </div>
  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
    <span style={{ color: '#1D9E75', fontSize: '16px' }}>✓</span>
    <p className="pdesc">Testet og godkjent av veterinærer</p>
  </div>
</div>
        </div>
      </div>
    </div>
  );
}