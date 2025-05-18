import { Toaster } from '@/components/ui/sonner';
import { ClerkProvider } from '@clerk/nextjs';
import type { Metadata } from 'next';
import { Outfit, Inter } from 'next/font/google';
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
          <main>{children}</main>
          <Toaster
            toastOptions={{ style: { pointerEvents: 'auto' } }}
            swipeDirections={['left', 'right']}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
