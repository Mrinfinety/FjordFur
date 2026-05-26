import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Personvern',
  description: 'Personvernerklæring for FjordFur. Vi tar vare på dine opplysninger i henhold til GDPR.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
