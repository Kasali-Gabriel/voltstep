'use client';

import { Label } from '@/components/ui/label';
import { useAdminSidebarStore, useNotificationTabs } from '@/lib/state';
import { X } from 'lucide-react';
import { motion } from 'motion/react';

export const NotificationHeader = () => {
  const { setShowNotificationSidebar, previousShowSidebar, setShowSideBar } =
    useAdminSidebarStore();

  const { activeTab, setActiveTab } = useNotificationTabs();

  const isDesktop =
    typeof window !== 'undefined' ? window.innerWidth >= 1280 : false;

  const tabs = [
    { key: 'orders', label: 'New Orders' },
    { key: 'stock', label: 'Stock Alert' },
  ];

  const handleClick = () => {
    setShowNotificationSidebar(false);

    if (isDesktop) {
      setShowSideBar(previousShowSidebar);
    }
  };

  const TabButton = () => (
    <div className="relative flex h-9 w-full overflow-hidden rounded-2xl bg-gray-200">
      <motion.div
        layout
        className="absolute top-0 left-0 h-full w-1/2 cursor-pointer rounded-2xl bg-neutral-700"
        animate={{
          x: activeTab === 'orders' ? 0 : '100%',
        }}
        transition={{ type: 'tween', duration: 0.1, ease: 'easeInOut' }}
      />

      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() =>
            activeTab !== tab.key && setActiveTab(tab.key as 'orders' | 'stock')
          }
          disabled={activeTab === tab.key}
          className={`z-10 flex flex-1 items-center justify-center transition-colors duration-200 ${
            activeTab === tab.key
              ? 'cursor-default text-white'
              : 'cursor-pointer text-black'
          }`}
        >
          <Label className={activeTab === tab.key ? '' : 'cursor-pointer'}>
            {tab.label}
          </Label>
        </button>
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-2 px-2 lg:mt-2">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Notifications</h2>

        <button
          onClick={handleClick}
          className="hidden cursor-pointer xl:block"
        >
          <X className="size-8" strokeWidth={1} />
        </button>

        <div className="hidden w-1/2 lg:block xl:hidden">
          <TabButton />
        </div>
      </div>

      <div className="lg:hidden xl:block">
        <TabButton />
      </div>
    </div>
  );
};

// TODO notification footer and content
export const NotificationFooter = () => {
  return <div></div>;
};

export const NotificationContent = () => {
  return <div></div>;
};
