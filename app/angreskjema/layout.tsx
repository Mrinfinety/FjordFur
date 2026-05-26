import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Angreskjema',
  description: 'Standardskjema for angrerett hos FjordFur. Bruk angreretten din innen 14 dager.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
