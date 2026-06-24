import type { Metadata } from 'next';
import { PRODUKTER } from '../../../lib/produkter';

const BASE = process.env.NEXT_PUBLIC_SITE_URL || 'https://fjordfur.com';

export async function generateMetadata(
  { params }: { params: Promise<{ id: string }> }
): Promise<Metadata> {
  const { id } = await params;
  const produkt = PRODUKTER.find(p => p.cjId === id);

  if (!produkt) {
    return {
      title: 'Produkt',
      description: 'Premium kjæledyrprodukter fra FjordFur. Gratis frakt over 499 kr.',
    };
  }

  const url = `${BASE}/produkt/${produkt.cjId}`;

  return {
    title: produkt.metaTittel,
    description: produkt.metaBeskrivelse,
    alternates: { canonical: url },
    openGraph: {
      title: `${produkt.metaTittel} | FjordFur`,
      description: produkt.metaBeskrivelse,
      url,
      siteName: 'FjordFur',
      locale: 'nb_NO',
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title: `${produkt.metaTittel} | FjordFur`,
      description: produkt.metaBeskrivelse,
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
