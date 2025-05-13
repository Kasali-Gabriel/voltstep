import FlashNews from '@/components/Navigation/FlashNews';
import Footer from '@/components/Navigation/Footer';
import Navbar from '@/components/Navigation/Navbar';

export default async function Home() {
  return (
    <div>
      <div className="md:hidden">
        <FlashNews />
      </div>
      <Navbar />

      <div className="hidden md:block">
        <FlashNews />
      </div>

      <main className=""></main>

      <Footer />
    </div>
  );
}
