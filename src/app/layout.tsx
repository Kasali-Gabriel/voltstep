import { fetchCatalogData } from '@/actions/products';
import { getUserById } from '@/actions/user';
import Wrapper from '@/components/Navigation/Wrapper';
import { Toaster } from '@/components/ui/sonner';
import { ClerkProvider } from '@clerk/nextjs';
import { auth } from '@clerk/nextjs/server';
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
  const { userId } = await auth();

  const res = await getUserById({ clerkUserId: userId ?? undefined });

  const user = res.user;

  const catalogs = await fetchCatalogData();

  const userContext = {
    id: user?.id ?? '',
    email: user?.email ?? '',
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    imageUrl: user?.imageUrl ?? '',
  };

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
          <Wrapper catalogs={catalogs} user={userContext}>
            {children}

            <Toaster
              toastOptions={{ style: { pointerEvents: 'auto' } }}
              swipeDirections={['left', 'right']}
            />
          </Wrapper>
        </body>
      </html>
    </ClerkProvider>
  );
}
