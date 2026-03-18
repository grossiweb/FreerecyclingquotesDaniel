import type { Metadata } from 'next';
import { Plus_Jakarta_Sans } from 'next/font/google';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { JsonLd, organizationSchema, webSiteSchema } from '@/lib/schema';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Recycling Quotes — Free Recycling Quotes for Businesses Nationwide',
    template: '%s | Recycling Quotes',
  },
  description: 'Get free recycling quotes for electronics, metals, paper, plastics, pallets and more. Certified recycling services nationwide with free pickup.',
  metadataBase: new URL('https://recyclingquotes.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://recyclingquotes.com',
    siteName: 'Recycling Quotes',
    title: 'Recycling Quotes — Free Recycling Quotes for Businesses Nationwide',
    description: 'Get free recycling quotes for electronics, metals, paper, plastics, pallets and more. Certified recycling services nationwide with free pickup.',
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://recyclingquotes.com' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={jakarta.variable}>
      <head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Symbols+Outlined" rel="stylesheet" />
        <JsonLd data={organizationSchema} />
        <JsonLd data={webSiteSchema} />
      </head>
      <body>
        <Header />
        {/* pt accounts for: utility bar (40px) + header (64px) = 104px on desktop */}
        {/* On scroll, utility bar hides and header moves to top — CSS handles this via the Header component */}
        <main className="pt-[104px] lg:pt-[104px]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
