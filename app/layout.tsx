import type { Metadata } from "next";
import "./globals.css";
import CookieBanner from "@/app/components/CookieBanner";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: {
    default: 'FjordFur — Premium kjæledyrutstyr',
    template: '%s | FjordFur',
  },
  description: 'Nøye utvalgte kjæledyrprodukter av høy kvalitet. Gratis frakt over 499 kr. 14 dagers angrerett.',
  keywords: ['kjæledyr', 'hundeutstyr', 'kattutstyr', 'kjæledyrbutikk', 'pet supplies', 'Norway'],
  openGraph: {
    title: 'FjordFur — Premium kjæledyrutstyr',
    description: 'Nøye utvalgte kjæledyrprodukter av høy kvalitet. Gratis frakt over 499 kr. 14 dagers angrerett.',
    url: 'https://fjordfur.com',
    siteName: 'FjordFur',
    locale: 'nb_NO',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'FjordFur — Premium kjæledyrutstyr',
    description: 'Nøye utvalgte kjæledyrprodukter av høy kvalitet. Gratis frakt over 499 kr.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no">
      <body>
        {children}
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  );
}