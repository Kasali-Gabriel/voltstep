import FlashNews from '@/components/FlashNews';
import Footer from '@/components/Footer/Footer';
import Navbar from '@/components/Navigation/Navbar';

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="md:hidden">
        <FlashNews />
      </div>

      <Navbar />

      <div className="hidden md:block">
        <FlashNews />
      </div>

      {children}

      <Footer />
    </div>
  );
}
