'use client';

import { Pagination, usePagination } from '@/components/Navigation/Pagination';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/lib/utils';
import {
  Calendar,
  DollarSign,
  ExternalLink,
  Package,
  ShoppingBag,
  User,
} from 'lucide-react';
import Link from 'next/link';

interface OrderItem {
  id: string;
  quantity: number;
  price: number;
  color: string;
  size: string;
  order: {
    id: string;
    orderNumber: string;
    status: string;
    paymentStatus: string;
    total: number;
    createdAt: Date;
    user: {
      id: string;
      firstName: string;
      lastName: string;
      email: string;
    };
  };
}

interface ProductOrderListProps {
  orders: OrderItem[];
  totalItems: number;
  onPageChange: (page: number) => void;
}

const ProductOrderList = ({
  orders,
  totalItems,
  onPageChange,
}: ProductOrderListProps) => {
  const { page, setPage, totalPages, start, end } = usePagination({
    totalItems,
    pageSize: 10,
    initialPage: 1,
  });

  const handlePageChange = (newPage: number | ((prev: number) => number)) => {
    const pageNumber = typeof newPage === 'function' ? newPage(page) : newPage;
    setPage(pageNumber);
    onPageChange(pageNumber);
  };

  return (
    <div className="pt-10 space-y-4">
      <div>Order History</div>

      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map((orderItem) => (
            <div
              key={orderItem.id}
              className="space-y-3 rounded-lg border p-4 transition-shadow hover:shadow-md"
            >
              <div className="flex items-center justify-between space-x-4">
                <span className="truncate font-medium">
                  #{orderItem.order.orderNumber}
                </span>

                <Link href={`/admin/orders/${orderItem.order.id}`}>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-1"
                  >
                    <ExternalLink size={14} />

                    <span>View</span>
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="flex space-x-2 xl:items-center">
                  <User className="size-8 text-gray-500" />

                  <div className="-mt-1 flex flex-col xl:-mt-0">
                    <p className="text-sm font-medium">
                      {orderItem.order.user.firstName}{' '}
                      {orderItem.order.user.lastName}
                    </p>

                    <p className="text-xs text-gray-500">
                      {orderItem.order.user.email}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2 xl:items-center">
                  <Calendar className="size-8 text-gray-500" />

                  <div className="-mt-1 flex flex-col xl:-mt-0">
                    <p className="text-sm font-medium">Order Date</p>

                    <p className="text-xs text-gray-500">
                      {formatDate(orderItem.order.createdAt, 'long')}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2 xl:items-center">
                  <Package className="size-8 text-gray-500" />

                  <div className="-mt-1 flex flex-col xl:-mt-0">
                    <p className="text-sm font-medium">Quantity</p>

                    <p className="text-xs text-gray-500">
                      {orderItem.quantity} × {orderItem.color} /{' '}
                      {orderItem.size}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-2 xl:items-center">
                  <DollarSign className="size-8 text-gray-500" />

                  <div className="-mt-1 flex flex-col xl:-mt-0">
                    <p className="text-sm font-medium">Item Total</p>

                    <p className="text-xs text-gray-500">
                      {orderItem.price * orderItem.quantity}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-8 text-center text-gray-500">
          <ShoppingBag size={48} className="mx-auto mb-4 text-gray-300" />
          <p>No orders found for this product.</p>
        </div>
      )}

      <Pagination
        page={page}
        setPage={handlePageChange}
        totalPages={totalPages}
        start={start}
        end={end}
        totalItems={totalItems}
        itemLabel="orders"
      />
    </div>
  );
};

export default ProductOrderList;
