import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Blogg',
  description: 'Tips, råd og guider for deg med hund og katt. Les artiklene våre om fôring, turutstyr og en bedre hverdag med kjæledyret ditt.',
};
export default function Layout({ children }: { children: React.ReactNode }) { return <>{children}</>; }
