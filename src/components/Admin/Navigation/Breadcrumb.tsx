'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { menuItems } from '@/data/sidebarItems';
import { MoreHorizontal } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useRef } from 'react';

const AdminBreadcrumb = () => {
  const pathname = usePathname();
  const listRef = useRef<HTMLOListElement>(null);

  const buildBreadcrumb = () => {
    const parts = pathname.split('/').filter((p: string) => p);
    const crumbs = [];

    crumbs.push({ label: 'Admin', route: '/admin' });

    if (parts.length === 1 && parts[0] === 'admin') {
      crumbs.push({ label: 'Dashboard' });
      return crumbs;
    }

    if (parts[0] !== 'admin') return crumbs;

    const menuPart = parts[1];

    const menuItem = menuItems.find((item) => {
      if (item.route === '/admin/' + menuPart) return true;

      return item.submenus.some(
        (sub) =>
          sub.route === '/admin/' + menuPart ||
          sub.route.startsWith('/admin/' + menuPart + '/'),
      );
    });

    if (!menuItem) return crumbs;

    const menuRoute =
      menuItem.route ||
      (menuItem.submenus.length > 0
        ? menuItem.submenus[0].route
        : '/admin/' + menuPart);

    crumbs.push({
      label: menuItem.label,
      route: menuRoute,
      submenus:
        menuItem.submenus.length > 0
          ? menuItem.submenus.map((s) => ({ label: s.label, route: s.route }))
          : undefined,
    });

    if (parts.length === 2) {
      return crumbs;
    }

    // parts.length >= 3
    const subPart = parts[2];

    let subIndex = menuItem.submenus.findIndex(
      (s) => s.route === '/admin/' + menuPart + '/' + subPart,
    );

    if (subIndex !== -1 && subIndex !== 0) {
      const sub = menuItem.submenus[subIndex];
      crumbs.push({ label: sub.label, route: sub.route });
    }

    // Handle catalog structure: /admin/inventory/catalogs/[slug]/[categorySlug]
    if (menuPart === 'inventory' && subPart === 'catalogs') {
      if (parts.length >= 4) {
        // Catalog slug (e.g., "men", "women")
        const catalogSlug = parts[3];
        const catalogLabel =
          catalogSlug.charAt(0).toUpperCase() + catalogSlug.slice(1);
        crumbs.push({
          label: catalogLabel,
          route: `/admin/inventory/catalogs/${catalogSlug}`,
        });

        if (parts.length >= 5) {
          // Category slug (e.g., "shoes", "clothing")
          const categorySlug = parts[4];
          const categoryLabel = categorySlug
            .split('-')
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ');
          crumbs.push({ label: categoryLabel });
        }
      }
    } else {
      // Handle other dynamic routes
      let dynamic = '';

      if (parts.length === 4) {
        dynamic = parts[3];
      } else if (
        parts.length === 3 &&
        subIndex === -1 &&
        menuItem.submenus.length > 0
      ) {
        subIndex = 0;
        dynamic = subPart;
      }

      if (dynamic) {
        let dynamicLabel = '';

        if (menuPart === 'inventory' && subPart === 'products') {
          dynamicLabel = dynamic
            .split('-')
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ');
        } else if (menuPart === 'orders') {
          dynamicLabel = `Order #${dynamic.slice(-8).toUpperCase()}`;
        } else if (menuPart === 'customers') {
          dynamicLabel = dynamic;
        }

        if (dynamicLabel) {
          crumbs.push({ label: dynamicLabel });
        }
      }
    }
    return crumbs;
  };

  const crumbs = buildBreadcrumb();

  return (
    <Breadcrumb>
      <BreadcrumbList ref={listRef}>
        {crumbs.map((crumb, index) => (
          <Fragment key={index}>
            {index > 0 && <BreadcrumbSeparator />}
            <BreadcrumbItem>
              {crumb.submenus ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    {crumb.route && index !== crumbs.length - 1 ? (
                      <BreadcrumbLink asChild>
                        <Link href={crumb.route}>
                          {crumbs.length > 4 && index === 1 ? (
                            <MoreHorizontal />
                          ) : (
                            crumb.label
                          )}
                        </Link>
                      </BreadcrumbLink>
                    ) : (
                      <BreadcrumbPage>
                        {crumbs.length > 4 && index === 1 ? (
                          <MoreHorizontal />
                        ) : (
                          crumb.label
                        )}
                      </BreadcrumbPage>
                    )}
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="start">
                    {crumb.submenus.map((sub, subIndex) => (
                      <DropdownMenuItem key={subIndex} asChild>
                        <Link href={sub.route}>{sub.label}</Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : crumb.route && index !== crumbs.length - 1 ? (
                <BreadcrumbLink asChild>
                  <Link href={crumb.route}>
                    {crumbs.length > 4 && index === 1 ? (
                      <MoreHorizontal />
                    ) : (
                      crumb.label
                    )}
                  </Link>
                </BreadcrumbLink>
              ) : (
                <BreadcrumbPage>
                  {crumbs.length > 4 && index === 1 ? (
                    <MoreHorizontal />
                  ) : (
                    crumb.label
                  )}
                </BreadcrumbPage>
              )}
            </BreadcrumbItem>
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AdminBreadcrumb;
