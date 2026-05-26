import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Spor bestilling',
  description: 'Spor pakken din fra FjordFur. Finn sporingsnummer og estimert leveringstid.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
