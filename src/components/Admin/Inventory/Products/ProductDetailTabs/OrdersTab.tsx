'use client';

import { usePagination } from '@/components/Navigation/Pagination';
import Loader from '@/components/ui/loader';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import ProductOrderList from '../ProductOrderList';
import ProductOrderStats from '../ProductOrderStats';

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

const OrdersTab = ({ productId }: { productId: string }) => {
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalQuantity: 0,
    totalRevenue: 0,
  });
  const [totalItems, setTotalItems] = useState(0);

  const { page, setPage, pageSize } = usePagination({
    totalItems,
    pageSize: 10,
    initialPage: 1,
  });

  const fetchOrders = useCallback(
    async (currentPage: number = 1) => {
      try {
        setLoading(true);
        const response = await axios.get(
          `/api/admin/inventory/products/${productId}/orders?page=${currentPage}&pageSize=${pageSize}`,
        );

        if (response.status === 200) {
          const data = response.data;
          setOrders(data.orders);
          setStats(data.stats);
          setTotalItems(data.pagination.totalItems);
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    },
    [productId, pageSize],
  );

  useEffect(() => {
    fetchOrders(page);
  }, [fetchOrders, page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  if (loading) {
    return (
      <div className="mt-14 h-full w-full justify-items-center">
        <Loader size={44} borderWidth="2px" color="black" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProductOrderStats stats={stats} />

      <ProductOrderList
        orders={orders}
        totalItems={totalItems}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default OrdersTab;
