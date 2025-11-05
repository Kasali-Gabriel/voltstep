import { Separator } from '@/components/ui/separator';
import { useSidebar } from '@/components/ui/sidebar';
import { useAdminSidebarStore } from '@/lib/state';
import { SidebarClose, SidebarOpen } from 'lucide-react';
import NotificationButton from '../Notifications/NotificationButton';
import Breadcrumb from './Breadcrumb';

const AdminNavbar = () => {
  const { isMobile, toggleSidebar, open } = useSidebar();
  const { setShowNotificationSidebar } = useAdminSidebarStore();

  // TODO notification values
  const value = 24;

  return (
    <header className="my-2 flex shrink-0 items-center justify-between gap-2 pr-7 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
      <div className="flex items-center gap-2 px-4">
        {/* Admin Sidebar trigger */}
        <button
          data-sidebar="trigger"
          data-slot="sidebar-trigger"
          className="-ml-1 cursor-pointer rounded-md p-1 hover:bg-neutral-200"
          onClick={() => {
            setShowNotificationSidebar(false);
            toggleSidebar();
          }}
        >
          {isMobile ? (
            <SidebarOpen className="size-8" />
          ) : open ? (
            <SidebarClose />
          ) : (
            <SidebarOpen />
          )}
          <span className="sr-only">Toggle Sidebar</span>
        </button>

        <Separator
          orientation="vertical"
          className="mr-2 hidden data-[orientation=vertical]:h-4 md:block"
        />

        {!isMobile && <Breadcrumb />}
      </div>

      <NotificationButton value={value} />
    </header>
  );
};

export default AdminNavbar;
