import Wrapper from '@/components/Navigation/Wrapper';
import { Toaster } from '@/components/ui/sonner';
import { Catalog } from '@/types/product';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';

export const metadata: Metadata = {
  title: 'Voltstep',
  description: 'Empowering Fitness',
};

const outfit = Outfit({ subsets: ['latin'], variable: '--font-outfit' });
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const res = await fetch('http://localhost:3000/api/products/catalogdata', {
    cache: 'no-store',
  });
  const catalogs: Catalog[] = await res.json();

  return (
    <ClerkProvider>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${outfit.variable} ${inter.variable}`}
      >
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any" />
        </head>

        <body>
          <Wrapper catalogs={catalogs}>{children}</Wrapper>;
          <Toaster
            toastOptions={{ style: { pointerEvents: 'auto' } }}
            swipeDirections={['left', 'right']}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
