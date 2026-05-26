import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Retur & Refusjon',
  description: '14 dagers angrerett. Enkel retur og rask refusjon hos FjordFur.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
