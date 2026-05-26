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

const PRODUKT_INNHOLD: Record<string, { navn: string; beskrivelse: string }> = {
  '1653041912300969984': {
    navn: 'Sakte-forer Skål',
    beskrivelse: 'En spesiallaget skål som bremser ned spisetempoet til hunden eller katten din. Forhindrer kvelning, oppblåsthet og fordøyelsesproblemer som kan oppstå ved rask spising. Ribbestrukturen i bunnen gjør at kjæledyret ditt må jobbe litt for maten — noe som stimulerer både kropp og hjerne. Laget av slitesterkt, BPA-fritt materiale som er enkelt å rengjøre.',
  },
  '2504100230321610200': {
    navn: 'Vannflaske 2-i-1',
    beskrivelse: 'Praktisk 2-i-1 løsning med integrert vannflaske og matbeholder i én enhet. Perfekt for turer, hytteturer og utflukter med hunden din. Trykk på knappen for å fylle den innebygde drikkekoppen med akkurat passe vann — raskt og uten søl. Kompakt design som enkelt får plass i en ryggsekk eller hundebag.',
  },
};

const RELATERTE: Record<string, { cjId: string; navn: string; pris: number; margin: number; bildIndex?: number }[]> = {
  '1653041912300969984': [{ cjId: '2504100230321610200', navn: 'Vannflaske 2-i-1', pris: 249, margin: 120 }],
  '2504100230321610200': [{ cjId: '1653041912300969984', navn: 'Sakte-forer Skål', pris: 149, margin: 132, bildIndex: 1 }],
};

const FARGE_ORD = ['green','blue','red','pink','orange','black','white','yellow','purple','gray','grey','brown'];

const NORSK: Record<string, string> = {
  'set1':'Rosa & Oransje','set':'Oransje & Grønn',
  'green':'Grønn','pink':'Rosa','orange':'Oransje','blue':'Blå','red':'Rød',
  'black':'Svart','white':'Hvit','yellow':'Gul','purple':'Lilla',
  'gray':'Grå','grey':'Grå','brown':'Brun',
  'small':'Liten','medium':'Medium','large':'Stor',
  'water grain cup':'Med matbeholder',
  'xs':'XS','s':'S','m':'M','l':'L','xl':'XL',
};

function oversett(tekst: string): string {
  let t = tekst.trim();
  for (const [en, no] of Object.entries(NORSK)) {
    t = t.replace(new RegExp(`\\b${en}\\b`, 'gi'), no);
  }
  return t.replace(/\bml\b/gi, 'ml');
}

function hentFarge(key: string): string | null {
  const k = key.toLowerCase();
  return FARGE_ORD.find(f => new RegExp(`\\b${f}\\b`).test(k)) || null;
}

function hentAnnenDim(key: string): string {
  let k = key.trim();
  FARGE_ORD.forEach(f => { k = k.replace(new RegExp(`\\b${f}\\b`, 'gi'), ''); });
  return k.trim().toLowerCase();
}

function hentDimensjoner(varianter: any[]) {
  const farger = new Set<string>();
  const andre = new Set<string>();
  varianter.forEach(v => {
    const f = hentFarge(v.variantKey || '');
    const a = hentAnnenDim(v.variantKey || '');
    if (f) farger.add(f);
    if (a) andre.add(a);
  });
  return { farger: [...farger], andre: [...andre], harBegge: farger.size > 0 && andre.size > 0 };
}

function finnVariant(varianter: any[], farge: string, annen: string): any {
  return varianter.find(v => {
    const k = (v.variantKey || '').toLowerCase();
    const mf = !farge || k.includes(farge.toLowerCase());
    const ma = !annen || k.toLowerCase().includes(annen.toLowerCase());
    return mf && ma;
  });
}

function andreDimLabel(verdier: string[]): string {
  if (verdier.some(v => /ml/i.test(v))) return 'Kapasitet';
  if (verdier.some(v => /xs|s|m|l|xl|small|medium|large/i.test(v))) return 'Størrelse';
  return 'Type';
}

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
  const [handlekurv, setHandlekurv] = useState<{ id: number; name: string; price: number; cjId: string; variantId: string; quantity: number }[]>([]);
  const [kurvaapen, setKurvAapen] = useState(false);
  const [relBilder, setRelBilder] = useState<Record<string, string>>({});
  const [valgtFarge, setValgtFarge] = useState('');
  const [valgtAnnen, setValgtAnnen] = useState('');

  useEffect(() => {
    try {
      const lagret = localStorage.getItem('fjordfur-cart');
      if (lagret) setHandlekurv(JSON.parse(lagret).map((i: any) => ({ ...i, quantity: i.quantity || 1 })));
    } catch {}
  }, []);

  useEffect(() => {
  fetch(`/api/products?pid=${id}`)
    .then(res => res.json())
    .then(async data => {
      setProdukt(data.data);
      const skjul = SKJUL_VARIANTER[id as string] ?? [];
      const synligeVarianter = data.data?.variants?.filter((v: any) =>
        !skjul.some(s => v.variantKey?.toLowerCase().includes(s))
      );
      const førsteVariant = synligeVarianter?.[0] ?? data.data?.variants?.[0];
      setValgtVariant(førsteVariant);

      const dim = hentDimensjoner(synligeVarianter || []);
      if (dim.harBegge) {
        const f = hentFarge(førsteVariant?.variantKey || '');
        const a = hentAnnenDim(førsteVariant?.variantKey || '');
        setValgtFarge(f || '');
        setValgtAnnen(a || '');
      }
      setLaster(false);

      const fast = PRODUKT_INNHOLD[id as string];
      setBeskrivelse(fast?.beskrivelse || '');
      setProduktNavn(fast?.navn || '');

      const rel = RELATERTE[id as string] ?? [];
      const bilder: Record<string, string> = {};
      await Promise.all(rel.map(async r => {
        const res = await fetch(`/api/products?pid=${r.cjId}`);
        const d = await res.json();
        const imgSet = d.data?.productImageSet;
        bilder[r.cjId] = imgSet?.[r.bildIndex ?? 0] || d.data?.bigImage || '';
      }));
      setRelBilder(bilder);
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

        .pstars { display: flex; align-items: center; gap: 8px; }
        .pstars-icons { color: #f59e0b; font-size: 16px; letter-spacing: 1px; }
        .pstars-text { font-size: 13px; color: #888; }

        .sticky-add {
          display: none;
          position: fixed; bottom: 0; left: 0; right: 0; z-index: 150;
          background: #fafaf8; border-top: 1px solid #e8e8e4;
          padding: 14px 20px; gap: 12px; align-items: center;
        }
        .sticky-add-name { font-size: 14px; font-weight: 500; color: #1a1a18; flex: 1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
        .sticky-add-price { font-size: 15px; font-weight: 600; color: #1a1a18; }
        .sticky-add-btn {
          background: #1D9E75; color: #fafaf8; border: none;
          border-radius: 8px; padding: 12px 20px;
          font-size: 14px; font-weight: 500; cursor: pointer;
          font-family: 'DM Sans', sans-serif; white-space: nowrap;
        }

        .relaterte { max-width: 1100px; margin: 0 auto; padding: 0 48px 64px; }
        .relaterte-tittel {
          font-family: 'Cormorant Garamond', serif;
          font-size: 24px; font-weight: 600; color: #1a1a18; margin-bottom: 20px;
        }
        .relaterte-grid { display: flex; gap: 16px; }
        .rel-card {
          flex: 0 0 240px; border: 1px solid #e8e8e4; border-radius: 12px;
          overflow: hidden; cursor: pointer; background: #fff;
          transition: all 0.2s;
        }
        .rel-card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.07); }
        .rel-img { height: 160px; overflow: hidden; background: #f7f7f5; }
        .rel-img img { width: 100%; height: 100%; object-fit: cover; }
        .rel-body { padding: 14px 16px; }
        .rel-name { font-size: 14px; font-weight: 500; color: #1a1a18; margin-bottom: 4px; }
        .rel-price { font-family: 'Cormorant Garamond', serif; font-size: 18px; font-weight: 600; color: #1a1a18; }

        @media (max-width: 768px) {
          .sticky-add { display: flex; }
          .relaterte { padding: 0 20px 80px; }
        }

        .pcart-btn {
          display: flex; align-items: center; gap: 8px;
          background: #1a1a18; color: #fafaf8;
          border: none; border-radius: 8px;
          padding: 9px 18px; font-size: 13px; font-weight: 500;
          cursor: pointer; font-family: 'DM Sans', sans-serif;
          transition: background 0.2s;
        }
        .pcart-btn:hover { background: #1D9E75; }

        .drawer-overlay {
          position: fixed; inset: 0;
          background: rgba(0,0,0,0.35); z-index: 200;
        }
        .drawer {
          position: fixed; top: 0; right: 0;
          width: 380px; height: 100vh;
          background: #fafaf8; border-left: 1px solid #e8e8e4;
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
          margin-top: auto; padding-top: 24px; border-top: 1px solid #e8e8e4;
        }
        .drawer-total-row {
          display: flex; justify-content: space-between;
          font-size: 15px; font-weight: 500; margin-bottom: 16px;
        }
        .btn-checkout {
          width: 100%; background: #1D9E75; color: #fafaf8;
          border: none; border-radius: 8px; padding: 14px;
          font-size: 14px; font-weight: 500; cursor: pointer;
          font-family: 'DM Sans', sans-serif;
        }

        @media (max-width: 768px) {
          .drawer { width: 100vw; border-left: none; padding: 24px 20px; }
        }

        @media (max-width: 768px) {
          .pnav { padding: 0 20px; }
          .pcontainer {
            grid-template-columns: 1fr;
            padding: 24px 20px;
            gap: 32px;
          }
          .ptitle { font-size: 28px; }
          .pprice { font-size: 26px; }
        }
      `}</style>

      <nav className="pnav">
        <a href="/" className="plogo">Fjord<span>Fur</span></a>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <a href="/" className="pback">← Tilbake til butikken</a>
          <button className="pcart-btn" onClick={() => setKurvAapen(true)}>
            🛒 Handlekurv ({handlekurv.reduce((sum, i) => sum + i.quantity, 0)})
          </button>
        </div>
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
          <p className="ptag">FjordFur</p>
          <h1 className="ptitle">{produktNavn || produkt.productNameEn}</h1>
          <p className="pprice">kr {visPris},–</p>
          <div className="pdivider" />

          {produkt.variants?.length > 1 && (() => {
            const synlige = sorterVarianter(produkt.variants.filter((v: any) =>
              !(SKJUL_VARIANTER[id as string] ?? []).some(s => v.variantKey?.toLowerCase().includes(s))
            ));
            const dim = hentDimensjoner(synlige);

            if (dim.harBegge) {
              return (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <p className="pvariant-label">{andreDimLabel(dim.andre)}</p>
                    <div className="pvariants">
                      {dim.andre.map(a => (
                        <button key={a}
                          className={`pvariant ${valgtAnnen === a ? 'active' : ''}`}
                          onClick={() => {
                            setValgtAnnen(a);
                            const v = finnVariant(synlige, valgtFarge, a);
                            if (v) setValgtVariant(v);
                          }}>
                          {oversett(a)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="pvariant-label">Farge</p>
                    <div className="pvariants">
                      {dim.farger.map(f => (
                        <button key={f}
                          className={`pvariant ${valgtFarge === f ? 'active' : ''}`}
                          onClick={() => {
                            setValgtFarge(f);
                            const v = finnVariant(synlige, f, valgtAnnen);
                            if (v) setValgtVariant(v);
                          }}>
                          {oversett(f)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              );
            }

            const label = dim.farger.length > 0 ? 'Farge' : dim.andre.length > 0 ? andreDimLabel(dim.andre) : 'Variant';
            return (
              <div>
                <p className="pvariant-label">{label}</p>
                <div className="pvariants">
                  {synlige.map((v: any) => (
                    <button key={v.vid}
                      className={`pvariant ${valgtVariant?.vid === v.vid ? 'active' : ''}`}
                      onClick={() => setValgtVariant(v)}>
                      {oversett(v.variantKey || '')}
                    </button>
                  ))}
                </div>
              </div>
            );
          })()}

          <button className="padd" onClick={() => {
            if (!valgtVariant?.vid) return;
            setHandlekurv(prev => {
              const eksisterende = prev.findIndex(i => i.variantId === valgtVariant.vid);
              let neste;
              if (eksisterende !== -1) {
                neste = prev.map((i, idx) => idx === eksisterende ? { ...i, quantity: (i.quantity || 1) + 1 } : i);
              } else {
                neste = [...prev, { id: Date.now(), name: produktNavn || produkt.productNameEn, price: visPris, cjId: id as string, variantId: valgtVariant.vid, quantity: 1 }];
              }
              localStorage.setItem('fjordfur-cart', JSON.stringify(neste));
              return neste;
            });
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
    <p className="pdesc">Sporbar levering hjem til deg</p>
  </div>
  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
    <span style={{ color: '#1D9E75', fontSize: '16px' }}>✓</span>
    <p className="pdesc">14 dagers angrerett</p>
  </div>
  <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
    <span style={{ color: '#1D9E75', fontSize: '16px' }}>✓</span>
    <p className="pdesc">Testet og godkjent av veterinærer</p>
  </div>
</div>
        </div>
      </div>

      {/* Relaterte produkter */}
      {(RELATERTE[id as string] ?? []).length > 0 && (
        <div className="relaterte">
          <h2 className="relaterte-tittel">Du vil kanskje også like</h2>
          <div className="relaterte-grid">
            {(RELATERTE[id as string] ?? []).map(r => (
              <div key={r.cjId} className="rel-card" onClick={() => window.location.assign(`/produkt/${r.cjId}?pris=${r.pris}&margin=${r.margin}`)}>
                <div className="rel-img">
                  {relBilder[r.cjId]
                    ? <img src={relBilder[r.cjId]} alt={r.navn} />
                    : <div style={{ width: '100%', height: '100%', background: '#f4f4f0' }} />}
                </div>
                <div className="rel-body">
                  <div className="rel-name">{r.navn}</div>
                  <div className="rel-price">kr {r.pris},–</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Sticky kjøpsknapp på mobil */}
      <div className="sticky-add">
        <span className="sticky-add-name">{produktNavn || produkt.productNameEn}</span>
        <span className="sticky-add-price">kr {visPris},–</span>
        <button className="sticky-add-btn" onClick={() => {
          if (!valgtVariant?.vid) return;
          setHandlekurv(prev => {
            const eksisterende = prev.findIndex(i => i.variantId === valgtVariant.vid);
            let neste;
            if (eksisterende !== -1) {
              neste = prev.map((i, idx) => idx === eksisterende ? { ...i, quantity: (i.quantity || 1) + 1 } : i);
            } else {
              neste = [...prev, { id: Date.now(), name: produktNavn || produkt.productNameEn, price: visPris, cjId: id as string, variantId: valgtVariant.vid, quantity: 1 }];
            }
            localStorage.setItem('fjordfur-cart', JSON.stringify(neste));
            return neste;
          });
          setLagtTil(true);
          setTimeout(() => setLagtTil(false), 2500);
        }}>
          {lagtTil ? '✓ Lagt til' : 'Legg i handlekurv'}
        </button>
      </div>

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
                if (handlekurv.length === 0) { alert('Handlekurven er tom!'); return; }
                try {
                  const res = await fetch('/api/checkout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ items: handlekurv.map(item => ({ name: item.name, price: item.price, quantity: item.quantity, cjId: item.cjId, variantId: item.variantId })) }),
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