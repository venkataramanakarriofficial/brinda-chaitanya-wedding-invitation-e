import './globals.css';

export const metadata = {
  metadataBase: new URL('https://brinda-chaitanya-wedding-invitation.vercel.app'),
  title: 'Brinda & Chaitanya | Wedding Invitation',
  description: 'Join Brinda and Chaitanya as they celebrate their wedding on Sunday, 15 November 2026 at Pentakota Convention Hall, Anakapalle.',
  alternates: { canonical: '/' },
  icons: { icon: '/assets/favicon.svg' },
  openGraph: {
    type: 'website',
    url: '/',
    siteName: 'Brinda & Chaitanya Wedding Invitation',
    title: 'Brinda & Chaitanya | Wedding Invitation',
    description: 'Sunday, 15 November 2026 · 10:14 PM · Pentakota Convention Hall, Anakapalle',
    images: [{
      url: '/assets/brinda-chaitanya-wedding-preview.jpg',
      width: 1200,
      height: 630,
      alt: 'Brinda and Chaitanya wedding invitation — 15 November 2026'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brinda & Chaitanya | Wedding Invitation',
    description: 'Sunday, 15 November 2026 · Pentakota Convention Hall, Anakapalle',
    images: ['/assets/brinda-chaitanya-wedding-preview.jpg']
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
