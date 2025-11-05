import { LayoutDashboard, Package, ShoppingCart, UserCheck, Users } from "lucide-react";

export const menuItems = [
  {
    label: 'Dashboard',
    icon: LayoutDashboard,
    route: '/admin',
    submenus: [],
  },
  {
    label: 'Orders',
    icon: ShoppingCart,
    route: null,
    submenus: [
      {
        label: 'Manage Orders',
        route: '/admin/orders',
      },
      {
        label: 'Analytics',
        route: '/admin/orders/analytics',
      },
    ],
  },
  {
    label: 'Inventory',
    icon: Package,
    route: null,
    submenus: [
      {
        label: 'Overview',
        route: '/admin/inventory',
      },
      {
        label: 'Products',
        route: '/admin/inventory/products',
      },
      {
        label: 'Catalogs',
        route: '/admin/inventory/catalogs',
      },
      {
        label: 'Stock Alerts',
        route: '/admin/inventory/stock',
      },
    ],
  },
  {
    label: 'Customers',
    icon: Users,
    route: null,
    submenus: [
      { label: 'Directory', route: '/admin/customers' },
      {
        label: 'Insights',
        route: '/admin/customers/insights',
      },
    ],
  },
  {
    label: 'User Roles',
    icon: UserCheck,
    route: '/admin/roles',
    submenus: [],
  },
];
