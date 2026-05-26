import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Produkt',
  description: 'Premium kjæledyrprodukter fra FjordFur. Gratis frakt over 499 kr.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
