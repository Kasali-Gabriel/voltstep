'use client';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
} from '@/components/ui/sheet';
import { useIsMobile } from '@/hooks/useIsMobile';
import { useNavBarStore } from '@/lib/state';
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import {
  BarChart3,
  ChevronRight,
  Package,
  ShoppingCart,
  UserCheck,
  Users,
} from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

// Import admin components
import Roles from './Roles';
import Dashboard from './Dashboard';
import Products from './Products';
import Orders from './Orders';
import Customers from './Customers';

type ActiveSection =
  | 'dashboard'
  | 'products'
  | 'orders'
  | 'customers'
  | 'roles';

export default function AdminPageContent() {
  const [isMobile] = useIsMobile(1024);
  const { navbarHeight } = useNavBarStore();
  const [isMounted, setIsMounted] = useState(false);
  const searchParams = useSearchParams();

  const [activeSection, setActiveSection] =
    useState<ActiveSection>('dashboard');
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const menuItems = [
    {
      id: 'dashboard' as ActiveSection,
      label: 'Dashboard',
      icon: BarChart3,
      component: Dashboard,
    },
    {
      id: 'products' as ActiveSection,
      label: 'Products',
      icon: Package,
      component: Products,
    },
    {
      id: 'orders' as ActiveSection,
      label: 'Orders',
      icon: ShoppingCart,
      component: Orders,
    },
    {
      id: 'customers' as ActiveSection,
      label: 'Customers',
      icon: Users,
      component: Customers,
    },
    {
      id: 'roles' as ActiveSection,
      label: 'User Roles',
      icon: UserCheck,
      component: Roles,
    },
  ];

  const ActiveComponent =
    menuItems.find((item) => item.id === activeSection)?.component || Dashboard;

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

  const ButtonOptions = () => (
    <div className="space-y-2">
      {menuItems.map((item) => {
        const Icon = item.icon;
        return (
          <button
            key={item.id}
            className={`flex w-full cursor-pointer items-center text-lg font-medium text-black ${isMobile ? 'justify-between border-b border-neutral-300 py-4 last:border-none' : 'h-12 justify-start'} ${
              activeSection === item.id && !isMobile
                ? 'rounded-lg bg-gray-100 px-3'
                : ''
            }`}
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
        <h2 className="mt-7 mb-16 text-2xl xl:text-3xl">Admin Panel</h2>
        <ButtonOptions />
      </div>
    );
  }

  if (isMobile) {
    return (
      <div className="w-full px-5 sm:px-10">
        <h2 className="mt-7 mb-16 text-2xl xl:text-3xl">Admin Panel</h2>

        <ButtonOptions />

        <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
          <SheetContent side="right" className="w-screen p-7 sm:p-12">
            <VisuallyHidden>
              <SheetHeader>
                <h2>Admin Panel</h2>
              </SheetHeader>
            </VisuallyHidden>

            <SheetClose asChild>
              <button className="ring-offset-background focus:ring-ring data-[state=open]:bg-secondary absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
                ×<span className="sr-only">Close</span>
              </button>
            </SheetClose>

            <ActiveComponent
              searchParams={{ search: searchParams.get('search') || undefined }}
            />
          </SheetContent>
        </Sheet>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen w-full sm:pl-10 xl:pl-20">
      {/* Sticky Sidebar */}
      <div className="sticky h-fit w-72" style={{ top: `${navbarHeight}px` }}>
        <h2 className="mt-24 mb-14 text-2xl xl:text-3xl">Admin Panel</h2>

        <ButtonOptions />
      </div>

      {/* Main Content */}
      <div className="flex-1 p-5 pt-56 sm:pl-20 xl:pl-36">
        <ActiveComponent
          searchParams={{ search: searchParams.get('search') || undefined }}
        />
      </div>
    </div>
  );
}
