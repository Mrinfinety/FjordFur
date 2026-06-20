import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://cf.cjdropshipping.com https://oss-cf.cjdropshipping.com; connect-src *;",
          },
          {
            // Hindrer at siden vises i en <iframe> på andre domener (klikk-kapring)
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            // Hindrer at nettleseren gjetter filtyper (MIME-sniffing)
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            // Begrenser hvor mye URL-info som sendes til andre nettsteder
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
        ],
      },
    ];
  },
};

export default nextConfig;