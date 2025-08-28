'use client';
import Loader from '@/components/ui/loader';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import AccountDetails from '@/components/User/AccountDetails';
import DeliveryAddresses from '@/components/User/DeliveryAddresses/DeliveryAddresses';
import PaymentMethod from '@/components/User/PaymentMethod';
// import PaymentMethods from '@/components/User/PaymentMethods/PaymentMethods';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useNavBarStore } from '@/lib/state';
import { useUser } from '@clerk/nextjs';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  MapPin,
  User,
} from 'lucide-react';
import { useEffect, useState } from 'react';

type ActiveSection =
  | 'account-details'
  | 'delivery-addresses'
  | 'payment-methods';

const Page = () => {
  const [isMobile] = useIsMobile(1024);
  const { navbarHeight } = useNavBarStore();
  const [isMounted, setIsMounted] = useState(false);

  const { isLoaded } = useUser();

  const [activeSection, setActiveSection] =
    useState<ActiveSection>('account-details');
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const menuItems = [
    {
      id: 'account-details' as ActiveSection,
      label: 'Account Details',
      icon: User,
      component: AccountDetails,
    },
    {
      id: 'payment-methods' as ActiveSection,
      label: 'Payment Methods',
      icon: CreditCard,
      component: PaymentMethod,
    },
    {
      id: 'delivery-addresses' as ActiveSection,
      label: 'Delivery Addresses',
      icon: MapPin,
      component: DeliveryAddresses,
    },
  ];

  const ActiveComponent =
    menuItems.find((item) => item.id === activeSection)?.component ||
    AccountDetails;

  const handleSectionChange = (section: ActiveSection) => {
    setActiveSection(section);
    if (isMobile) {
      setIsSheetOpen(true);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setIsSheetOpen(false);
  }, [isMobile]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const section = params.get('section') as ActiveSection | null;

    if (section) {
      setActiveSection(section);
    }
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeSection]);

  const ButtonOptions = () => (
    <div className="space-y-2">
      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            className={`flex w-full cursor-pointer items-center text-lg font-medium text-black ${isMobile ? 'justify-between border-b border-neutral-300 py-4 last:border-none' : 'h-12 justify-start'}`}
            onClick={() => handleSectionChange(item.id)}
          >
            <div className="flex items-center gap-5">
              <Icon className="size-8" strokeWidth={1.2} />
              {item.label}
            </div>

            {isMobile && <ChevronRight size={28} strokeWidth={1.75} />}
          </button>
        );
      })}
    </div>
  );

  // Prevent hydration mismatch by using fallback layout until mounted
  if (!isMounted) {
    return (
      <div className="w-full px-5 sm:px-10">
        <h2 className="mt-7 mb-16 text-2xl xl:text-3xl">Settings</h2>
        <ButtonOptions />
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="w-full px-5 sm:px-10">
        <h2 className="mt-7 mb-16 text-2xl xl:text-3xl">Settings</h2>

        <ButtonOptions />

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent side="right" className="w-screen p-7 sm:p-12">
            <VisuallyHidden>
              <SheetHeader>
                <SheetTitle></SheetTitle>
                <SheetDescription></SheetDescription>
              </SheetHeader>
            </VisuallyHidden>

            <SheetClose asChild>
              <div className="my-3 flex w-full cursor-pointer items-center gap-2 text-neutral-700 hover:text-black sm:my-5">
                <ChevronLeft size={28} strokeWidth={1.75} />

                <span className="text-lg font-medium">Back</span>
              </div>
            </SheetClose>

            <ActiveComponent />
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full sm:pl-10 xl:pl-20">
      {/* Sticky Sidebar */}
      <div className="sticky h-fit w-72" style={{ top: `${navbarHeight}px` }}>
        <h2 className="mt-24 mb-14 text-2xl xl:text-3xl">Settings</h2>

        <ButtonOptions />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5 pt-56">
        {isLoaded ? (
          <ActiveComponent />
        ) : (
          <Loader color="black" size={44} borderWidth="2px" />
        )}
      </div>
    </div>
  );
};

export default Page;
