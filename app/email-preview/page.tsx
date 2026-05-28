'use client';
import { useState } from 'react';

const NAVN = 'Ola Nordmann';
const ORDRE_NR = 'FF-ABC123456789';
const TRACKING = 'YT2024012345678';
const LOGISTIC = 'CJPacket Ordinary';

function buildOrdreHtml(en: boolean) {
  const totalNok = '449';
  const items = [
    { name: en ? 'Slow Feeder Bowl' : 'Sakte-forer Skål', qty: 1 },
    { name: en ? 'Interactive Laser Toy' : 'Interaktivt Laserleke', qty: 2 },
  ];
  const leveringsadresse = `${NAVN}<br>Storgata 1<br>0182 Oslo<br>NO`;
  const raderHtml = items.map(item =>
    `<tr><td style="padding:8px 0;color:#333;border-bottom:1px solid #f0f0ec">${item.name}</td><td style="padding:8px 0;color:#333;text-align:right;border-bottom:1px solid #f0f0ec">×${item.qty}</td></tr>`
  ).join('');

  return `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e8e8e4;border-radius:8px;overflow:hidden">
      <div style="background:#1a1a18;padding:24px 32px">
        <span style="font-family:Georgia,serif;font-size:22px;color:#ffffff">Fjord<span style="color:#1D9E75">Fur</span></span>
      </div>
      <div style="padding:32px">
        <h1 style="font-family:Georgia,serif;font-size:24px;color:#1a1a18;margin:0 0 8px">${en ? `Thank you for your order, ${NAVN.split(' ')[0]}!` : `Takk for bestillingen, ${NAVN.split(' ')[0]}!`}</h1>
        <p style="color:#666;font-size:14px;margin:0 0 28px">${en ? 'Order number' : 'Ordrenummer'}: <strong>${ORDRE_NR}</strong></p>
        <table style="width:100%;border-collapse:collapse;margin-bottom:24px">
          ${raderHtml}
          <tr>
            <td style="padding:12px 0;font-weight:600;color:#1a1a18;font-size:15px">${en ? 'Total paid' : 'Totalt betalt'}</td>
            <td style="padding:12px 0;font-weight:600;color:#1a1a18;text-align:right;font-size:15px">NOK ${totalNok}</td>
          </tr>
        </table>
        <div style="background:#f7f7f5;border-radius:6px;padding:16px 20px;margin-bottom:24px">
          <p style="font-size:12px;color:#888;margin:0 0 6px;text-transform:uppercase;letter-spacing:0.08em">${en ? 'Delivery address' : 'Leveringsadresse'}</p>
          <p style="font-size:14px;color:#333;margin:0;line-height:1.7">${leveringsadresse}</p>
        </div>
        <div style="background:#f7f7f5;border-radius:6px;padding:16px 20px;margin-bottom:24px">
          <p style="font-size:14px;color:#444;margin:0;line-height:1.7">
            ${en ? 'Your package will be shipped directly from our warehouse and delivered within <strong>2–3 weeks</strong>.' : 'Pakken sendes direkte fra vårt lager og leveres innen <strong>2–3 uker</strong>.'}
          </p>
        </div>
        <div style="background:#eaf7f2;border:1px solid #c3e9d8;border-radius:6px;padding:20px;margin-bottom:28px;text-align:center">
          <p style="font-size:13px;color:#555;margin:0 0 6px">
            ${en ? '📦 You will receive a separate email with your tracking number as soon as the package is dispatched.' : '📦 Du mottar en egen e-post med sporingsnummer så snart pakken er sendt.'}
          </p>
          <p style="font-size:12px;color:#888;margin:0 0 14px">
            ${en ? 'Want to check delivery info in the meantime?' : 'Vil du se leveringsinformasjon i mellomtiden?'}
          </p>
          <a href="https://fjordfur.com/sporing" style="display:inline-block;background:#1D9E75;color:#ffffff;text-decoration:none;padding:11px 28px;border-radius:6px;font-size:13px;font-weight:600">${en ? 'Tracking info →' : 'Sporingsinformasjon →'}</a>
        </div>
        <div style="border-top:1px solid #e8e8e4;padding-top:24px;margin-bottom:24px">
          <p style="font-size:14px;color:#444;margin:0 0 8px"><strong>${en ? 'Questions?' : 'Spørsmål?'}</strong> ${en ? 'Contact us:' : 'Ta kontakt med oss:'}</p>
          <p style="font-size:14px;color:#444;margin:0">${en ? 'Email' : 'E-post'}: <a href="mailto:contact.fjordfur@gmail.com" style="color:#1D9E75">contact.fjordfur@gmail.com</a></p>
          <p style="font-size:13px;color:#888;margin:6px 0 0">${en ? 'We respond within 1–2 business days.' : 'Vi svarer innen 1–2 virkedager.'}</p>
        </div>
        <div style="text-align:center;margin-bottom:28px">
          <a href="https://fjordfur.com" style="display:inline-block;background:#1a1a18;color:#ffffff;text-decoration:none;padding:11px 24px;border-radius:6px;font-size:13px;font-weight:600">${en ? 'Back to fjordfur.com' : 'Se flere produkter på fjordfur.com'}</a>
        </div>
        <hr style="border:none;border-top:1px solid #e8e8e4;margin:0 0 24px">
        <div style="background:#f7f7f5;border-radius:6px;padding:20px;font-size:12px;color:#555;line-height:1.8">
          ${en ? `
          <p style="margin:0 0 10px;font-weight:600;color:#333">Standard cancellation / right of withdrawal form</p>
          <p style="margin:0 0 6px">To: FjordFur, contact.fjordfur@gmail.com</p>
          <p style="margin:0 0 6px">I hereby give notice that I wish to withdraw from my purchase of:</p>
          <p style="margin:0 0 6px">______________________________________</p>
          <p style="margin:0 0 6px">Ordered on: _______________ &nbsp; Received on: _______________</p>
          <p style="margin:0 0 6px">Name: ______________________________________</p>
          <p style="margin:0 0 6px">Address: ______________________________________</p>
          <p style="margin:0 0 6px">Email address: ______________________________________</p>
          <p style="margin:0 0 6px">Date: _______________</p>
          <p style="margin:12px 0 0;color:#888;font-style:italic">Signature is not required when submitting by email. You have 14 days right of withdrawal from receipt of the goods. We will refund the full purchase price without requiring you to return the item.</p>
          ` : `
          <p style="margin:0 0 10px;font-weight:600;color:#333">Standardskjema for bruk av angrerett (angrerettloven vedlegg 1)</p>
          <p style="margin:0 0 6px">Til: FjordFur, contact.fjordfur@gmail.com</p>
          <p style="margin:0 0 6px">Jeg meddeler herved at jeg ønsker å benytte angreretten for kjøp av:</p>
          <p style="margin:0 0 6px">______________________________________</p>
          <p style="margin:0 0 6px">Bestilt den: _______________ &nbsp; Mottatt den: _______________</p>
          <p style="margin:0 0 6px">Navn: ______________________________________</p>
          <p style="margin:0 0 6px">Adresse: ______________________________________</p>
          <p style="margin:0 0 6px">E-postadresse: ______________________________________</p>
          <p style="margin:0 0 6px">Dato: _______________</p>
          <p style="margin:12px 0 0;color:#888;font-style:italic">Underskrift er ikke nødvendig ved innsending per e-post. Du har 14 dagers angrerett fra mottak av varen. Vi refunderer hele kjøpesummen uten at du trenger å sende varen tilbake.</p>
          `}
        </div>
      </div>
      <div style="background:#f7f7f5;padding:16px 32px;border-top:1px solid #e8e8e4;text-align:center">
        <p style="font-size:11px;color:#aaa;margin:0">© 2026 FjordFur — Premium pet supplies &nbsp;|&nbsp; <a href="https://fjordfur.com/personvern" style="color:#aaa">${en ? 'Privacy' : 'Personvern'}</a> &nbsp;|&nbsp; <a href="https://fjordfur.com/vilkar" style="color:#aaa">${en ? 'Terms' : 'Vilkår'}</a></p>
      </div>
    </div>
  `;
}

function buildSporingsHtml(en: boolean) {
  const fornavn = NAVN.split(' ')[0];
  return `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e8e8e4;border-radius:8px;overflow:hidden">
      <div style="background:#1a1a18;padding:24px 32px">
        <span style="font-family:Georgia,serif;font-size:22px;color:#ffffff">Fjord<span style="color:#1D9E75">Fur</span></span>
      </div>
      <div style="padding:32px">
        <h1 style="font-family:Georgia,serif;font-size:24px;color:#1a1a18;margin:0 0 8px">
          ${en ? `Your order is on its way, ${fornavn}!` : `Pakken din er på vei, ${fornavn}!`}
        </h1>
        <p style="color:#666;font-size:14px;margin:0 0 28px">${en ? 'Order number' : 'Ordrenummer'}: <strong>${ORDRE_NR}</strong></p>
        <div style="background:#eaf7f2;border:1px solid #c3e9d8;border-radius:6px;padding:24px;margin-bottom:28px;text-align:center">
          <p style="font-size:12px;color:#888;margin:0 0 6px;text-transform:uppercase;letter-spacing:0.08em">${en ? 'Tracking number' : 'Sporingsnummer'}</p>
          <p style="font-size:24px;font-weight:700;color:#1a1a18;letter-spacing:0.06em;margin:0 0 6px">${TRACKING}</p>
          <a href="https://www.17track.net/en#nums=${TRACKING}" style="display:inline-block;background:#1D9E75;color:#ffffff;text-decoration:none;padding:12px 32px;border-radius:6px;font-size:14px;font-weight:600">
            ${en ? 'Track my package →' : 'Spor pakken min →'}
          </a>
        </div>
        <div style="background:#f7f7f5;border-radius:6px;padding:16px 20px;margin-bottom:28px">
          <p style="font-size:14px;color:#444;margin:0;line-height:1.7">
            ${en
              ? 'Tracking updates may take 2–3 days to appear after the package is dispatched.'
              : 'Sporingsoppdateringer kan ta 2–3 dager å dukke opp etter at pakken er sendt.'}
          </p>
        </div>
        <div style="border-top:1px solid #e8e8e4;padding-top:24px;margin-bottom:24px">
          <p style="font-size:14px;color:#444;margin:0 0 8px"><strong>${en ? 'Questions?' : 'Spørsmål?'}</strong> ${en ? 'Contact us:' : 'Ta kontakt med oss:'}</p>
          <p style="font-size:14px;color:#444;margin:0">${en ? 'Email' : 'E-post'}: <a href="mailto:contact.fjordfur@gmail.com" style="color:#1D9E75">contact.fjordfur@gmail.com</a></p>
          <p style="font-size:13px;color:#888;margin:6px 0 0">${en ? 'We respond within 1–2 business days.' : 'Vi svarer innen 1–2 virkedager.'}</p>
        </div>
        <div style="text-align:center;margin-bottom:24px">
          <a href="https://fjordfur.com" style="display:inline-block;background:#1a1a18;color:#ffffff;text-decoration:none;padding:11px 24px;border-radius:6px;font-size:13px;font-weight:600">${en ? 'Back to fjordfur.com' : 'Se flere produkter på fjordfur.com'}</a>
        </div>
      </div>
      <div style="background:#f7f7f5;padding:16px 32px;border-top:1px solid #e8e8e4;text-align:center">
        <p style="font-size:11px;color:#aaa;margin:0">© 2026 FjordFur — Premium pet supplies &nbsp;|&nbsp; <a href="https://fjordfur.com/personvern" style="color:#aaa">${en ? 'Privacy' : 'Personvern'}</a></p>
      </div>
    </div>
  `;
}

function buildAnmeldelseHtml(en: boolean) {
  const fornavn = NAVN.split(' ')[0];
  const reviewUrl = 'https://www.trustpilot.com/review/fjordfur.com';
  return `
    <div style="font-family:Arial,sans-serif;max-width:560px;margin:0 auto;background:#ffffff;border:1px solid #e8e8e4;border-radius:8px;overflow:hidden">
      <div style="background:#1a1a18;padding:24px 32px">
        <span style="font-family:Georgia,serif;font-size:22px;color:#ffffff">Fjord<span style="color:#1D9E75">Fur</span></span>
      </div>
      <div style="padding:32px">
        <h1 style="font-family:Georgia,serif;font-size:24px;color:#1a1a18;margin:0 0 8px">
          ${en ? `How was your order, ${fornavn}?` : `Hvordan var bestillingen, ${fornavn}?`}
        </h1>
        <p style="color:#666;font-size:14px;margin:0 0 28px">${en ? 'Order number' : 'Ordrenummer'}: <strong>${ORDRE_NR}</strong></p>
        <div style="background:#f7f7f5;border-radius:6px;padding:24px;margin-bottom:28px;text-align:center">
          <p style="font-size:15px;color:#333;margin:0 0 20px;line-height:1.6">
            ${en
              ? "We hope your order arrived safely! If you have a moment, we'd love to hear what you think."
              : 'Vi håper pakken kom frem som den skulle! Hvis du har et øyeblikk, vil vi gjerne høre hva du synes.'}
          </p>
          <div style="margin-bottom:12px">
            <span style="font-size:28px;letter-spacing:4px">★★★★★</span>
          </div>
          <a href="${reviewUrl}" style="display:inline-block;background:#1D9E75;color:#ffffff;text-decoration:none;padding:12px 32px;border-radius:6px;font-size:14px;font-weight:600">
            ${en ? 'Leave a review →' : 'Skriv en anmeldelse →'}
          </a>
        </div>
        <div style="border-top:1px solid #e8e8e4;padding-top:24px;margin-bottom:24px">
          <p style="font-size:14px;color:#444;margin:0 0 8px"><strong>${en ? 'Questions?' : 'Spørsmål?'}</strong></p>
          <p style="font-size:14px;color:#444;margin:0">${en ? 'Email' : 'E-post'}: <a href="mailto:contact.fjordfur@gmail.com" style="color:#1D9E75">contact.fjordfur@gmail.com</a></p>
          <p style="font-size:13px;color:#888;margin:6px 0 0">${en ? 'We respond within 1–2 business days.' : 'Vi svarer innen 1–2 virkedager.'}</p>
        </div>
        <div style="text-align:center;margin-bottom:24px">
          <a href="https://fjordfur.com" style="display:inline-block;background:#1a1a18;color:#ffffff;text-decoration:none;padding:11px 24px;border-radius:6px;font-size:13px;font-weight:600">${en ? 'Back to fjordfur.com' : 'Se flere produkter på fjordfur.com'}</a>
        </div>
      </div>
      <div style="background:#f7f7f5;padding:16px 32px;border-top:1px solid #e8e8e4;text-align:center">
        <p style="font-size:11px;color:#aaa;margin:0">© 2026 FjordFur — Premium pet supplies &nbsp;|&nbsp; <a href="https://fjordfur.com/personvern" style="color:#aaa">${en ? 'Privacy' : 'Personvern'}</a></p>
      </div>
    </div>
  `;
}

export default function EmailPreview() {
  const [lang, setLang] = useState<'no' | 'en'>('no');
  const [type, setType] = useState<'ordre' | 'sporing' | 'anmeldelse'>('ordre');
  const en = lang === 'en';
  const html = type === 'ordre' ? buildOrdreHtml(en) : type === 'sporing' ? buildSporingsHtml(en) : buildAnmeldelseHtml(en);

  return (
    <div style={{ fontFamily: 'Arial, sans-serif', background: '#e8e8e4', minHeight: '100vh', padding: '24px' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <span style={{ fontWeight: 600, color: '#333' }}>E-postforhåndsvisning</span>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button onClick={() => setType('ordre')} style={{ padding: '6px 14px', borderRadius: '4px', border: 'none', cursor: 'pointer', background: type === 'ordre' ? '#1a1a18' : '#ccc', color: type === 'ordre' ? '#fff' : '#333', fontWeight: 600 }}>
              1. Ordrebekreftelse
            </button>
            <button onClick={() => setType('sporing')} style={{ padding: '6px 14px', borderRadius: '4px', border: 'none', cursor: 'pointer', background: type === 'sporing' ? '#1a1a18' : '#ccc', color: type === 'sporing' ? '#fff' : '#333', fontWeight: 600 }}>
              2. Sporingsepost
            </button>
            <button onClick={() => setType('anmeldelse')} style={{ padding: '6px 14px', borderRadius: '4px', border: 'none', cursor: 'pointer', background: type === 'anmeldelse' ? '#1a1a18' : '#ccc', color: type === 'anmeldelse' ? '#fff' : '#333', fontWeight: 600 }}>
              3. Anmeldelse
            </button>
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button onClick={() => setLang('no')} style={{ padding: '6px 14px', borderRadius: '4px', border: 'none', cursor: 'pointer', background: lang === 'no' ? '#1D9E75' : '#ccc', color: lang === 'no' ? '#fff' : '#333', fontWeight: 600 }}>
              NO
            </button>
            <button onClick={() => setLang('en')} style={{ padding: '6px 14px', borderRadius: '4px', border: 'none', cursor: 'pointer', background: lang === 'en' ? '#1D9E75' : '#ccc', color: lang === 'en' ? '#fff' : '#333', fontWeight: 600 }}>
              EN
            </button>
          </div>
        </div>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  );
}
