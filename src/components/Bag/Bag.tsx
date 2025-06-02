import { useCartStore } from '@/hooks/use-cart';
import { useBagStore } from '@/lib/state';
import { SignedIn, SignedOut } from '@clerk/nextjs';
import { faBagShopping, faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { ShieldCheck, ShoppingBag, X } from 'lucide-react';
import { motion } from 'motion/react';
import { forwardRef, useEffect, useRef, useState } from 'react';
import SignedOutComponent from '../Authentication/signedOut';
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '../ui/drawer';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { WishList } from '../Wishlist/WishList';
import { BagContent } from './BagContent';

export const Bag = () => {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  const { isBagOpen, setIsBagOpen } = useBagStore();
  const { items } = useCartStore();

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isSmallScreen]);

  const BagButton = forwardRef<
    HTMLButtonElement,
    React.ButtonHTMLAttributes<HTMLButtonElement>
  >((props, ref) => (
    <button
      ref={ref}
      {...props}
      className={[
        'relative flex cursor-pointer rounded-full p-2 hover:bg-neutral-200',
        props.className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <ShoppingBag size={20} strokeWidth={1.25} className="h-6 w-6" />
      {items.length > 0 && (
        <span className="absolute bottom-5 left-5 flex size-5 items-center justify-center rounded-full bg-slate-400 p-0.5 text-sm text-white">
          {items.length}
        </span>
      )}
    </button>
  ));

  BagButton.displayName = 'BagButton';

  const Tab = () => {
    const [activeTab, setActiveTab] = useState<'bag' | 'wishlist'>('bag');
    const [isScrolled, setIsScrolled] = useState(false);
    const [notAtBottom, setNotAtBottom] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const tabs = [
      { key: 'bag', icon: faBagShopping },
      { key: 'wishlist', icon: faHeart },
    ];

    useEffect(() => {
      const handleScroll = () => {
        const el = scrollRef.current;
        if (!el) return;
        setIsScrolled(el.scrollTop > 0);
        setNotAtBottom(el.scrollTop + el.clientHeight < el.scrollHeight - 1);
      };
      const el = scrollRef.current;
      if (el) {
        el.addEventListener('scroll', handleScroll);
        // Initial check
        handleScroll();
      }
      return () => {
        if (el) el.removeEventListener('scroll', handleScroll);
      };
    }, [scrollRef]);

    return (
      <div className="relative flex h-full w-full flex-col pb-2">
        <div
          className={
            'sticky top-0 z-20 flex w-full items-center justify-between bg-white p-2 px-4 transition-shadow sm:px-10 sm:py-3 md:py-5' +
            (isScrolled ? ' shadow-[0_10px_10px_-3px_rgba(0,0,0,0.3)]' : '')
          }
        >
          {activeTab === 'bag' && (
            <h2 className="w-44 text-lg font-semibold">YOUR BAG</h2>
          )}

          {activeTab === 'wishlist' && (
            <h2 className="w-44 text-lg font-semibold">YOUR WISHLIST</h2>
          )}

          <div className="relative flex h-9 w-28 overflow-hidden rounded-full bg-gray-200">
            <motion.div
              layout
              className="absolute top-0 left-0 h-full w-1/2 rounded-full bg-black"
              animate={{
                x: activeTab === 'bag' ? 0 : '100%',
              }}
              transition={{ type: 'tween', duration: 0.1, ease: 'easeInOut' }}
            />

            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as 'bag' | 'wishlist')}
                className={`z-10 flex flex-1 cursor-pointer items-center justify-center transition-colors duration-200 ${
                  activeTab === tab.key ? 'text-white' : 'text-black'
                }`}
              >
                <FontAwesomeIcon icon={tab.icon} size="lg" />
              </button>
            ))}
          </div>

          <SheetClose className="hidden lg:block">
            <X className="size-8 cursor-pointer" strokeWidth={1} />
          </SheetClose>
        </div>

        <div
          ref={scrollRef}
          className={`flex-1 overflow-y-auto px-4 sm:px-10 ${isScrolled ? '' : 'my-6 lg:mt-3'}`}
          style={{ position: 'relative' }}
        >
          {activeTab === 'bag' && <BagContent setActiveTab={setActiveTab} />}

          {activeTab === 'wishlist' && (
            <>
              <SignedIn>
                <WishList isPage={false} />
              </SignedIn>

              <SignedOut>
                <SignedOutComponent
                  isSheet
                  title="💚 SAVE TO WISHLIST"
                  description="Found something you adore? 💫 Your wishlist is the perfect place to keep all your favorite finds — outfits, accessories, and little obsessions — safe and easy to revisit anytime."
                />
              </SignedOut>
            </>
          )}
        </div>

        {/* TODO checkout page and stripe */}
        <div
          className={`z-20 px-4 sm:px-10 ${notAtBottom && isScrolled ? 'shadow-[0_-10px_10px_-3px_rgba(0,0,0,0.3)]' : ''}`}
        >
          {items.length > 0 && activeTab === 'bag' && (
            <button className="mt-4 mb-6 flex w-full cursor-pointer justify-center space-x-3 rounded-4xl bg-black py-3 text-center font-bold text-white hover:bg-stone-900 md:py-4 xl:mb-2">
              <ShieldCheck />
              <span> CHECKOUT </span>
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <>
      {isSmallScreen ? (
        <Drawer open={isBagOpen} onOpenChange={setIsBagOpen}>
          <DrawerTrigger asChild>
            <BagButton />
          </DrawerTrigger>
          <DrawerContent
            className="z-60 h-full w-full"
            onPointerDownOutside={(e) => {
              if (
                e.target instanceof Element &&
                e.target.closest('[data-sonner-toast]')
              ) {
                e.preventDefault();
              }
            }}
          >
            <VisuallyHidden>
              <DrawerHeader>
                <DrawerTitle></DrawerTitle>
                <DrawerDescription></DrawerDescription>
              </DrawerHeader>
            </VisuallyHidden>

            <Tab />
          </DrawerContent>
        </Drawer>
      ) : (
        <Sheet open={isBagOpen} onOpenChange={setIsBagOpen}>
          <SheetTrigger asChild>
            <BagButton />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="z-[60] h-full w-[35rem] xl:w-[32rem]"
            onPointerDownOutside={(e) => {
              if (
                e.target instanceof Element &&
                e.target.closest('[data-sonner-toast]')
              ) {
                e.preventDefault();
              }
            }}
          >
            <VisuallyHidden>
              <SheetHeader>
                <SheetTitle />
                <SheetDescription />
              </SheetHeader>
            </VisuallyHidden>

            <Tab />
          </SheetContent>
        </Sheet>
      )}
    </>
  );
};
