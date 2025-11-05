import { Order, OrderStatus } from './order';

export interface User {
  id: string;
  firstName: string | null;
  lastName: string | null;
  emailAddresses: {
    id: string;
    emailAddress: string;
  }[];
  primaryEmailAddressId: string | null;
  publicMetadata: {
    role?: string;
  };
}

export type Customer = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string | null;
  createdAt: Date;
  totalOrders: number;
  totalReviews: number;
  totalSpent: number;
  lastActive: Date;
};

export interface OrderListProps {
  filteredOrders: Order[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
  page: number;
  setPage: (page: number | ((prev: number) => number)) => void;
  totalPages: number;
  start: number;
  end: number;
  totalItems: number;
  itemLabel?: string;
  scrollRef: React.RefObject<HTMLDivElement | null>;
}

export interface OrderDetailsProps {
  order: Order;
  onClose: () => void;
  handleStatusChange: (orderId: string, newStatus: OrderStatus) => void;
  updatingOrderId: string | null;
}

export interface CustomerStats {
  totalCustomers: number;
  newCustomersThisMonth: number;
  newCustomersChange: number;
  totalSpent: number;
  spentChange: number;
  avgOrderValue: number;
}

export interface NewCustomerData {
  month: string;
  customers: number;
}

export interface OrderFrequencyData {
  range: string;
  customers: number;
}

export interface TopSpenderData {
  name: string;
  email: string;
  totalSpent: number;
}

export interface CustomerDetail {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  imageUrl: string | null;
  createdAt: Date;
  lastActive: Date;
  totalOrders: number;
  totalSpent: number;
  avgOrderValue: number;
  totalReviews: number;
}

export interface CustomerReview {
  id: string;
  rating: number;
  title: string;
  details: string;
  date: Date;
  productName?: string;
  productSlug?: string;
}

export interface CustomerOrder {
  id: string;
  status: string;
  totalAmount: number;
  createdAt: Date;
  deliveredAt: Date | null;
  items: {
    productName: string;
    quantity: number;
    price: number;
  }[];
}

export interface ActivityItem {
  id: string;
  type: 'order' | 'review' | 'wishlist' | 'view' | 'search';
  date: Date;
  description: ActivityDescriptionPart[];
  value?: number;
}

export interface ActivityDescriptionPart {
  text: string;
  bold?: boolean;
  italic?: boolean;
}

export interface SpendingData {
  month: string;
  amount: number;
}

export interface CustomerAnalyticsChartsProps {
  newCustomersData: NewCustomerData[];
  orderFrequencyData: OrderFrequencyData[];
  topSpendersData: TopSpenderData[];
}

export interface CustomerSearchProps {
  searchTerm: string;
  onSearchTermChange: (term: string) => void;
  searchResults: Customer[];
  searchLoading: boolean;
  showDropdown: boolean;
  onCustomerSelect: (customer: Customer) => void;
}

export interface CategoryBreakdown {
  category: string;
  amount: number;
  percentage: number;
}

export interface CustomerActivity {
  id: string;
  type: 'order' | 'review' | 'wishlist' | 'view' | 'search';
  date: Date;
  description: ActivityDescriptionPart[];
  value?: number;
}

export interface CustomerDetailProps {
  customer: CustomerDetail;
  reviews: CustomerReview[];
  orders: CustomerOrder[];
  spendingData: SpendingData[];
  categoryData: CategoryBreakdown[];
  activities: CustomerActivity[];
}
