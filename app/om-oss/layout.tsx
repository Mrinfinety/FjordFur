import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Om oss',
  description: 'FjordFur ble startet av kjæledyreiere som ville gjøre det enkelt å finne gode produkter til rimelige priser.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
