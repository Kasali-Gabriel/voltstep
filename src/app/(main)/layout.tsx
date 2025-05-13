import FlashNews from '@/components/Navigation/FlashNews';
import Footer from '@/components/Navigation/Footer';
import Navbar from '@/components/Navigation/Navbar';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col">
      <div className="md:hidden">
        <FlashNews />
      </div>

      <Navbar />

      <div className="hidden md:block">
        <FlashNews />
      </div>

      <main className="flex-1">{children}</main>

      <div className="relative z-10 pb-[80px] lg:pb-0">
        <Footer />
      </div>
    </div>
  );
}
