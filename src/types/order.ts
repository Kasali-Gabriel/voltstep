import {
  Prisma,
  OrderStatus as PrismaOrderStatus,
  Tag as PrismaTag,
} from '@prisma/client';
import { CreateDeliveryAddressInput, DeliveryAddress } from './address';
import { CartItem } from './cart';
import { User } from './user';

export type OrderStatus = PrismaOrderStatus;

export interface Order {
  id: string;
  items: OrderItem[];
  userId: string | null;
  user?: User | null;
  deliveryAddressId?: string | null;
  deliveryAddress?: DeliveryAddress | null;
  totalAmount: number;
  status: PrismaOrderStatus;
  paymentStatus: 'PENDING' | 'SUCCEEDED' | 'FAILED';
  stripePaymentId?: string | null;
  stripePaymentMethodId?: string | null;
  stripePaymentMethodType?: string | null;
  stripePaymentMethodDetails?: Prisma.JsonValue;
  cardBrand?: string | null;
  cardLast4?: string | null;
  cardExpMonth?: number | null;
  cardExpYear?: number | null;
  shippingCost: number;
  taxAmount: number;
  guestDeliveryAddress?: Prisma.JsonValue;
  confirmedAt?: Date | null;
  shippedAt?: Date | null;
  deliveredAt?: Date | null;
  cancelledAt?: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product: {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    quantity: number;
    images: string[];
    tags: PrismaTag[];
    createdAt: Date;
    updatedAt: Date;
    subcategoryId: string;
    popularityScore: number;
    lastScoreUpdate: Date | null;
  };
  quantity: number;
  size?: string | null;
  color: string;
  price: number;
}

export interface CreateOrderInput {
  items: {
    productId: string;
    quantity: number;
    size?: string;
    color: string;
    price: number;
  }[];
  totalAmount: number;
  paymentStatus?: 'PENDING' | 'SUCCEEDED' | 'FAILED';
  userId?: string;
  shippingCost?: number;
  taxAmount?: number;
}

export interface UpdateOrderInput {
  paymentStatus?: 'PENDING' | 'SUCCEEDED' | 'FAILED';
  status?: PrismaOrderStatus;
  items?: {
    productId: string;
    quantity: number;
    size?: string;
    color: string;
    price: number;
  }[];
  totalAmount?: number;
  shippingCost?: number;
  taxAmount?: number;
  deliveryAddressId?: string | null;
  guestDeliveryAddress?: CreateDeliveryAddressInput;
  stripePaymentId?: string;
  stripePaymentMethodId?: string;
  stripePaymentMethodType?: string;
  stripePaymentMethodDetails?: Prisma.InputJsonValue;
}

export interface CheckoutOrderSummaryProps {
  items: CartItem[];
  subtotal: number;
  shippingCost: number;
  taxAmount: number;
  total: number;
}

export interface OrderDeliveryAddressProps {
  deliveryAddress: Order['deliveryAddress'];
  status: string;
}

export interface OrdersFiltersProps {
  status: string;
  setStatus: (s: string) => void;
  dateRange: string;
  setDateRange: (d: string) => void;
  minAmount: number;
  maxAmount: number;
  setMinAmount: (m: number) => void;
  setMaxAmount: (m: number) => void;
  sortOrder: string;
  setSortOrder: (s: string) => void;
}

export interface SelectedOrdersFiltersProps {
  status: string;
  setStatus: (s: string) => void;
  dateRange: string;
  setDateRange: (d: string) => void;
  minAmount: number;
  maxAmount: number;
  setMinAmount: (m: number) => void;
  setMaxAmount: (m: number) => void;
}
