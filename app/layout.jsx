import './globals.css';

export const metadata = {
  title: 'Brinda & Chaitanya | A Wedding in Bloom',
  description: 'With love and joy, Brinda Yellapu and Chaitanya invite you to celebrate their wedding on 15 November 2026, 10:14 PM, in Anakapalle.',
  icons: { icon: '/assets/favicon.svg' },
  openGraph: {
    type: 'website',
    title: 'Brinda & Chaitanya | A Wedding in Bloom',
    description: 'Sunday, 15 November 2026 · 10:14 PM · Pentakota Convention Hall, Anakapalle',
    images: [{ url: '/assets/floral-arch-watercolor.webp', width: 1240, height: 1748, alt: 'Floral watercolor wedding invitation' }]
  }
};

export const viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover', themeColor: '#faf7f2' };

export default function RootLayout({ children }) {
  return <html lang="en"><head>
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=DM+Sans:wght@400;500;600;700&family=Great+Vibes&display=swap" rel="stylesheet" />
  </head><body className="film-active">{children}</body></html>;
}
