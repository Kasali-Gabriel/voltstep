import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { useAdminSidebarStore } from '@/lib/state';
import {
  NotificationContent,
  NotificationFooter,
  NotificationHeader,
} from './Notifications';

const NotificationSidebar = () => {
  const { showNotificationSidebar, setShowNotificationSidebar } =
    useAdminSidebarStore();

  return (
    <Sidebar
      side="right"
      open={showNotificationSidebar}
      onOpenChange={setShowNotificationSidebar}
      
    >
      <SidebarHeader className="bg-white">
        <NotificationHeader />
      </SidebarHeader>

      <SidebarContent className=" bg-white">
        <SidebarGroup />
        <NotificationContent />
        <SidebarGroup />
      </SidebarContent>

      <SidebarFooter className="bg-white">
        <NotificationFooter />
      </SidebarFooter>
    </Sidebar>
  );
};

export default NotificationSidebar;
