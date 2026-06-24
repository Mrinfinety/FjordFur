import { MetadataRoute } from 'next';
import { PRODUKTER } from '../lib/produkter';
import { ARTIKLER } from '../lib/blogg';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://fjordfur.com';

const PRODUCTS = PRODUKTER.map(p => p.cjId);

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/om-oss`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/blogg`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    ...ARTIKLER.map(a => ({
      url: `${BASE}/blogg/${a.slug}`,
      lastModified: new Date(a.datoISO),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    { url: `${BASE}/sporing`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/retur`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE}/vilkar`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/personvern`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
    { url: `${BASE}/angreskjema`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    ...PRODUCTS.map(id => ({
      url: `${BASE}/produkt/${id}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
  ];
}
