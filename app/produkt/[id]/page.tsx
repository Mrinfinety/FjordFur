'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

const STØRRELSE_REKKEFØLGE = ['xs', 's', 'm', 'l', 'xl'];

function sorterVarianter(varianter: any[]) {
  return [...varianter].sort((a, b) => {
    const nøkkelA = a.variantKey?.toLowerCase() ?? '';
    const nøkkelB = b.variantKey?.toLowerCase() ?? '';
    const iA = STØRRELSE_REKKEFØLGE.findIndex(s => nøkkelA === s || nøkkelA.endsWith(`-${s}`) || nøkkelA.includes(` ${s}`));
    const iB = STØRRELSE_REKKEFØLGE.findIndex(s => nøkkelB === s || nøkkelB.endsWith(`-${s}`) || nøkkelB.includes(` ${s}`));
    if (iA === -1 && iB === -1) return 0;
    if (iA === -1) return 1;
    if (iB === -1) return -1;
    return iA - iB;
  });
}

const SKJUL_VARIANTER: Record<string, string[]> = {};

export default function ProduktSide() {
  const { id } = useParams();
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const fastPris = parseInt(searchParams.get('pris') || '0');
  const margin = parseInt(searchParams.get('margin') || '15');
  const [produkt, setProdukt] = useState<any>(null);
  const [valgtVariant, setValgtVariant] = useState<any>(null);
  const [laster, setLaster] = useState(true);
  const [beskrivelse, setBeskrivelse] = useState('');
  const [variantNavn, setVariantNavn] = useState<Record<string, string>>({});
  const [produktNavn, setProduktNavn] = useState('');
  const [aktivBilde, setAktivBilde] = useState(0);
  const [lagtTil, setLagtTil] = useState(false);

  useEffect(() => {
  fetch(`/api/products?pid=${id}`)
    .then(res => res.json())
    .then(async data => {
      setProdukt(data.data);
      const skjul = SKJUL_VARIANTER[id as string] ?? [];
      const synligeVarianter = data.data?.variants?.filter((v: any) =>
        !skjul.some(s => v.variantKey?.toLowerCase().includes(s))
      );
      setValgtVariant(synligeVarianter?.[0] ?? data.data?.variants?.[0]);
      setLaster(false);

      const res = await fetch('/api/beskriv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ produktnavn: data.data?.productNameEn }),
      });
      const aiData = await res.json();
      setBeskrivelse(aiData.beskrivelse || '');
      setProduktNavn(aiData.navn || '');
    });
}, [id]);

  if (laster) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', fontFamily: 'DM Sans, sans-serif' }}>
      Laster produkt...
    </div>
  );

  const visPris = (() => {
    const alleFormulaPriser = produkt?.variants?.map((v: any) =>
      Math.round(v.variantSellPrice * margin / 10) * 10) ?? [];
    const minFormulaPrice = alleFormulaPriser.length > 0 ? Math.min(...alleFormulaPriser) : fastPris;
    const currentFormulaPrice = Math.round(valgtVariant?.variantSellPrice * margin / 10) * 10;
    if (currentFormulaPrice === minFormulaPrice) return fastPris;
    return Math.round(currentFormulaPrice * fastPris / minFormulaPrice / 10) * 10 - 1;
  })();

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
  <div style={{ position: 'relative' }}>
    <img
      className="pmain-img"
      src={produkt.productImageSet?.[aktivBilde] || valgtVariant?.variantImage || produkt.bigImage}
      alt={produkt.productNameEn}
    />
    <button onClick={() => setAktivBilde(prev => Math.max(0, prev - 1))} style={{
      position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)',
      background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%',
      width: '36px', height: '36px', cursor: 'pointer', fontSize: '16px',
      display: aktivBilde === 0 ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center'
    }}>←</button>
    <button onClick={() => setAktivBilde(prev => Math.min((produkt.productImageSet?.length || 1) - 1, prev + 1))} style={{
      position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)',
      background: 'rgba(255,255,255,0.9)', border: 'none', borderRadius: '50%',
      width: '36px', height: '36px', cursor: 'pointer', fontSize: '16px',
      display: aktivBilde === (produkt.productImageSet?.length || 1) - 1 ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center'
    }}>→</button>
  </div>
  <div className="pthumbs">
    {produkt.productImageSet?.slice(0, 6).map((img: string, i: number) => (
      <img
        key={i}
        src={img}
        className={`pthumb ${aktivBilde === i ? 'active' : ''}`}
        alt={`Bilde ${i + 1}`}
        onClick={() => setAktivBilde(i)}
      />
    ))}
  </div>
</div>

        <div className="pinfo">
          <p className="ptag">NordicPaws</p>
          <h1 className="ptitle">
  {produktNavn || produkt.productNameEn}
</h1>
          <p className="pprice">kr {visPris},–</p>
          <div className="pdivider" />

          {produkt.variants?.length > 1 && (
            <div>
              <p className="pvariant-label">Variant</p>
              <div className="pvariants">
                {sorterVarianter(produkt.variants.filter((v: any) =>
                  !(SKJUL_VARIANTER[id as string] ?? []).some(s => v.variantKey?.toLowerCase().includes(s))
                )).map((v: any) => (
                  <button
                    key={v.vid}
                    className={`pvariant ${valgtVariant?.vid === v.vid ? 'active' : ''}`}
                    onClick={() => setValgtVariant(v)}
                  >
                    {(variantNavn[v.variantKey] && variantNavn[v.variantKey].length > 0 ? variantNavn[v.variantKey] : v.variantKey)
  .replace(/Set1/g, '§§§')
  .replace(/Set/g, 'Oransje & Grønn')
  .replace(/§§§/g, 'Rosa & Oransje')
  .replace(/Green/gi, 'Grønn')
  .replace(/Pink/gi, 'Rosa')
  .replace(/Orange/gi, 'Oransje')
  .replace(/Blue/gi, 'Blå')
  .replace(/Red/gi, 'Rød')
  .replace(/Black/gi, 'Svart')
  .replace(/White/gi, 'Hvit')
  .replace(/Yellow/gi, 'Gul')
  .replace(/Purple/gi, 'Lilla')
  .replace(/Gray/gi, 'Grå')
  .replace(/Grey/gi, 'Grå')
  .replace(/Brown/gi, 'Brun')
  .replace(/Small/gi, 'Liten')
  .replace(/Medium/gi, 'Medium')
  .replace(/Large/gi, 'Stor')
  .replace(/Water Grain Cup/gi, 'Med matbeholder')
  .replace(/White/gi, 'Hvit')
  .replace(/Yellow/gi, 'Gul')
  .replace(/Purple/gi, 'Lilla')
  .replace(/ML/g, 'ml')
  .replace(/XL/gi, 'XL')}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button className="padd" onClick={() => {
            if (!valgtVariant?.vid) return;
            const cart = JSON.parse(localStorage.getItem('nordicpaws-cart') || '[]');
            const eksisterende = cart.findIndex((i: any) => i.variantId === valgtVariant.vid);
            if (eksisterende !== -1) {
              cart[eksisterende].quantity = (cart[eksisterende].quantity || 1) + 1;
            } else {
              cart.push({
                id: Date.now(),
                name: produktNavn || produkt.productNameEn,
                price: visPris,
                cjId: id,
                variantId: valgtVariant.vid,
                quantity: 1,
              });
            }
            localStorage.setItem('nordicpaws-cart', JSON.stringify(cart));
            setLagtTil(true);
            setTimeout(() => setLagtTil(false), 2500);
          }}>
            {lagtTil ? '✓ Lagt i handlekurven' : 'Legg i handlekurv'}
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
    <p className="pdesc">Levering 2–3 uker</p>
  </div>
  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
    <span style={{ color: '#1D9E75', fontSize: '16px' }}>✓</span>
    <p className="pdesc">14 Dagers angrerett</p>
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