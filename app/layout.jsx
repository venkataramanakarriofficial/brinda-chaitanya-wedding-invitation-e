import './globals.css';

export const metadata = {
  title: 'Brinda & Sai Chaitanya — Wedding Invitation',
  description: 'Brinda Yellapu and Dr. Malla Venkata Satya Sai Chaitanya request the honour of your presence on 15 November 2026 in Anakapalle.',
  icons: { icon: '/assets/favicon.svg' },
  openGraph: {
    type: 'website',
    title: 'Brinda & Sai Chaitanya — Wedding Invitation',
    description: 'A beautiful beginning, made complete by your presence. Sunday, 15 November 2026.'
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#12342b'
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Manrope:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body className="intro-active">{children}</body>
    </html>
  );
}
