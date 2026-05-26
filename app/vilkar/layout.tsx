import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Kjøpsvilkår',
  description: 'Kjøpsvilkår for FjordFur — norsk nettbutikk for kjæledyrprodukter.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
