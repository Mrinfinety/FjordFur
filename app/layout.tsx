import type { Metadata } from "next";
import "./globals.css";
import CookieBanner from "@/app/components/CookieBanner";

export const metadata: Metadata = {
  title: "NordicPaws — Premium kjæledyrutstyr",
  description: "Nøye utvalgte kjæledyrprodukter av høy kvalitet. Rask levering til hele Norge.",
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
      </body>
    </html>
  );
}