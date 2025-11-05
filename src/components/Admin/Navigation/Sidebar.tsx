'use client';

import smallLogo from '@/assets/logoIcon.png';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
  useSidebar,
} from '@/components/ui/sidebar';
import { menuItems } from '@/data/sidebarItems';
import { useAdminSidebarStore } from '@/lib/state';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect } from 'react';
import SideBarFooter from './SidebarFooter';

const AdminSideBar = () => {
  const { isMobile, state, setOpenMobile } = useSidebar();
  const router = useRouter();
  const pathname = usePathname();
  const {
    collapsibleStates,
    setCollapsibleState,
    setShowSideBar,
    setShowNotificationSidebar,
  } = useAdminSidebarStore();

  // Check if a route matches the current pathname
  const isRouteActive = useCallback(
    (route: string | null) => {
      if (!route) return false;
      return pathname === route || pathname.endsWith(route);
    },
    [pathname],
  );

  // Determine the active submenu, including dynamic routes
  const getActiveSubmenu = useCallback(
    (item: (typeof menuItems)[number]) => {
      // Exact match first
      const found = item.submenus.find((sub) => isRouteActive(sub.route));
      if (found) return found.route;

      // Dynamic route fallback
      if (item.label === 'Orders' && /^\/admin\/orders\/.+/.test(pathname))
        return '/admin/orders';
      if (
        item.label === 'Inventory' &&
        /^\/admin\/inventory\/products\/.+/.test(pathname)
      )
        return '/admin/inventory/products';
      if (
        item.label === 'Customers' &&
        /^\/admin\/customers\/.+/.test(pathname)
      )
        return '/admin/customers';

      return null;
    },
    [pathname, isRouteActive],
  );

  // Determine if parent menu should be active
  const isMenuActive = (item: (typeof menuItems)[number]) => {
    if (pathname === '/admin' && item.label === 'Dashboard') return true;

    if (item.submenus.length > 0) {
      const activeSub = getActiveSubmenu(item);
      if (activeSub && state === 'collapsed') return true;
      if (activeSub) return false;
      return isRouteActive(item.route);
    }
    return isRouteActive(item.route);
  };

  const handleSectionChange = (route: string) => {
    const parentItem = menuItems.find((item) =>
      item.submenus.some((sub) => sub.route === route),
    );

    if (parentItem && state === 'collapsed') {
      setShowSideBar(true);
      setCollapsibleState(parentItem.label, true);
      setShowNotificationSidebar(false);
    }

    router.push(route);

    if (isMobile) setOpenMobile(false);
  };

  const handleCollapsibleClick = (item: (typeof menuItems)[number]) => {
    if (state === 'collapsed') {
      setShowSideBar(true);
      setCollapsibleState(item.label, true);
      setShowNotificationSidebar(false);
      // Navigate to first submenu item when expanding from collapsed state
      handleSectionChange(item.submenus[0].route);
    }
  };

  // Expand the parent collapsible for active submenu on mount / route change
  useEffect(() => {
    menuItems.forEach((item) => {
      const activeSub = getActiveSubmenu(item);
      if (activeSub) setCollapsibleState(item.label, true);
    });
  }, [pathname, getActiveSubmenu, setCollapsibleState]);

  return (
    <Sidebar variant="floating" collapsible={isMobile ? 'offcanvas' : 'icon'}>
      <SidebarHeader className="bg-background rounded-2xl">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="pointer-events-none">
              <Image
                src={smallLogo}
                height={52}
                alt="logo"
                className="transition-all duration-300 ease-in-out"
              />
              <div className="grid flex-1 leading-tight">
                <h2 className="font-medium">Voltstep</h2>
                <h3 className="text-sm font-medium text-neutral-500">Admin</h3>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="bg-white">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) =>
                item.submenus.length > 0 ? (
                  <Collapsible
                    key={item.label}
                    open={
                      getActiveSubmenu(item)
                        ? true
                        : (collapsibleStates[item.label] ?? true)
                    }
                    onOpenChange={(open) => {
                      // Only handle non-collapsed state changes
                      if (state === 'collapsed') return;

                      // Don't change state if there's an active submenu
                      if (getActiveSubmenu(item)) return;

                      setCollapsibleState(item.label, open);
                    }}
                    className="group/collapsible"
                  >
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton
                          isActive={isMenuActive(item)}
                          className="h-10 cursor-pointer sm:h-10"
                          onClick={() => {
                            if (state === 'collapsed') {
                              handleCollapsibleClick(item);
                            }
                          }}
                        >
                          <item.icon
                            className={`mr-2 ${
                              state === 'collapsed' ? 'size-4' : '!size-5'
                            }`}
                          />
                          <span className="mt-0.5 text-base">{item.label}</span>
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>

                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.submenus.map((sub) => (
                            <SidebarMenuSubItem key={sub.route}>
                              <SidebarMenuButton
                                asChild
                                isActive={getActiveSubmenu(item) === sub.route}
                              >
                                <button
                                  className="flex h-9 w-full cursor-pointer items-center px-6 text-left hover:bg-stone-100"
                                  onClick={() => handleSectionChange(sub.route)}
                                >
                                  <span className="text-base">{sub.label}</span>
                                </button>
                              </SidebarMenuButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                ) : (
                  <SidebarMenuItem key={item.label}>
                    <SidebarMenuButton
                      asChild
                      isActive={isMenuActive(item)}
                      onClick={() => handleSectionChange(item.route ?? '')}
                    >
                      <button className="flex h-10 cursor-pointer items-center px-2 hover:bg-stone-200">
                        <item.icon
                          className={`mr-2 ${
                            state === 'collapsed' ? 'size-4' : '!size-5'
                          }`}
                        />
                        <span className="text-base">{item.label}</span>
                      </button>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ),
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SideBarFooter />
    </Sidebar>
  );
};

export default AdminSideBar;
