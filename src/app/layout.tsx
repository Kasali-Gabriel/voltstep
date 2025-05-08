import FlashNews from '@/components/FlashNews';
import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navigation/Navbar';
import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Voltstep',
  description: '  ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>

      <body>
        <div className="md:hidden">
          <FlashNews />
        </div>

        <Navbar />

        <div className="hidden md:block">
          <FlashNews />
        </div>
        {children}

        <Footer />
      </body>
    </html>
  );
}
