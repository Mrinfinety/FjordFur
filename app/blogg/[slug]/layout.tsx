import type { Metadata } from 'next';
import { hentArtikkel } from '../../../lib/blogg';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const artikkel = hentArtikkel(slug);
  if (!artikkel) {
    return { title: 'Blogg', description: 'Tips og råd for deg med hund og katt.' };
  }
  return {
    title: artikkel.metaTittel,
    description: artikkel.metaBeskrivelse,
    openGraph: {
      title: artikkel.metaTittel,
      description: artikkel.metaBeskrivelse,
      type: 'article',
    },
  };
}

export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
