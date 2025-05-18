import FlashNews from '@/components/Navigation/FlashNews';
import Footer from '@/components/Navigation/Footer';
import Header from '@/components/Navigation/Header';

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="mt-16 flex flex-1 flex-col md:mt-32 xl:mt-16">
        <FlashNews />
        {children}
      </main>

      <div className="relative z-10 mt-auto pb-[80px] lg:pb-0">
        <Footer />
      </div>
    </div>
  );
}
