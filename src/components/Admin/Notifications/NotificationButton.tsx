'use client';

import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from '@/components/ui/drawer';
import { useAdminSidebarStore } from '@/lib/state';
import { Bell } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  NotificationContent,
  NotificationFooter,
  NotificationHeader,
} from './Notifications';

const NotificationButton = ({ value }: { value: number }) => {
  const displayValue = value > 99 ? '99+' : value;

  const isDesktop =
    typeof window !== 'undefined' ? window.innerWidth >= 1280 : false;

  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const {
    showNotificationSidebar,
    setShowNotificationSidebar,
    showSidebar,
    setPreviousShowSidebar,
    setShowSideBar,
  } = useAdminSidebarStore();

  const handleClick = () => {
    if (isDesktop) {
      setPreviousShowSidebar(showSidebar);
      setShowSideBar(false);
      setShowNotificationSidebar(true);
    } else {
      setIsDrawerOpen(true);
      setShowNotificationSidebar(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (isDesktop) {
        setIsDrawerOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [isDesktop]);

  return (
    <>
      {(!showNotificationSidebar && isDesktop) || !isDesktop ? (
        <button
          className="relative mt-3 cursor-pointer md:mt-2"
          onClick={handleClick}
        >
          <Bell className="size-8" />
          <div
            className={`absolute -top-1 right-0.5 size-6 translate-x-1/4 -translate-y-1/4 items-center justify-center rounded-full bg-red-600 p-0.5 text-xs font-bold text-white ${displayValue === 0 ? 'hidden' : 'flex'}`}
          >
            {displayValue}
          </div>
        </button>
      ) : null}

      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <NotificationHeader />
          </DrawerHeader>

          <NotificationContent />

          <DrawerFooter>
            <NotificationFooter />
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default NotificationButton;
