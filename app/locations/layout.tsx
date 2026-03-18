import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recycling Locations — 97+ Cities Worldwide',
  description: 'Free recycling pickup in 52 US cities, 12 Canadian cities, 25 UK cities, and 8 Australian cities. Find certified recycling services near you.',
  alternates: { canonical: 'https://recyclingquotes.com/locations' },
};

export default function LocationsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
