'use client';

import { OrderCard } from '@/components/Orders/OrderCard';
import { OrdersFilters } from '@/components/Orders/OrdersFilters';
import { OrdersPagination } from '@/components/Orders/OrdersPagination';
import { Button } from '@/components/ui/button';
import Loader from '@/components/ui/loader';
import { fetchData } from '@/lib/fetch';
import { Order } from '@/types/order';
import { useUser } from '@clerk/nextjs';
import { Package } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';

const PAGE_SIZE = 5;

export default function OrdersPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const ordersRef = useRef<HTMLDivElement>(null);

  // Filter states
  const [status, setStatus] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [minAmount, setMinAmount] = useState(0);
  const [maxAmount, setMaxAmount] = useState(1000);
  const [sortOrder, setSortOrder] = useState('newest');

  // Filter and sort orders
  const filteredAndSortedOrders = useMemo(() => {
    let filtered = [...orders];

    // Filter by status
    if (status) {
      filtered = filtered.filter((order) => order.status === status);
    }

    // Filter by date range
    if (dateRange) {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

      switch (dateRange) {
        case 'today':
          filtered = filtered.filter((order) => {
            const orderDate = new Date(order.createdAt);
            return orderDate >= today;
          });
          break;
        case 'last7days':
          const last7Days = new Date(today);
          last7Days.setDate(today.getDate() - 7);
          filtered = filtered.filter((order) => {
            const orderDate = new Date(order.createdAt);
            return orderDate >= last7Days;
          });
          break;
        case 'last30days':
          const last30Days = new Date(today);
          last30Days.setDate(today.getDate() - 30);
          filtered = filtered.filter((order) => {
            const orderDate = new Date(order.createdAt);
            return orderDate >= last30Days;
          });
          break;
        case 'thisyear':
          const startOfYear = new Date(now.getFullYear(), 0, 1);
          filtered = filtered.filter((order) => {
            const orderDate = new Date(order.createdAt);
            return orderDate >= startOfYear;
          });
          break;
      }
    }

    // Filter by amount range
    filtered = filtered.filter(
      (order) =>
        order.totalAmount >= minAmount && order.totalAmount <= maxAmount,
    );

    // Sort orders
    switch (sortOrder) {
      case 'newest':
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        );
        break;
      case 'oldest':
        filtered.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
        );
        break;
      case 'highest':
        filtered.sort((a, b) => b.totalAmount - a.totalAmount);
        break;
      case 'lowest':
        filtered.sort((a, b) => a.totalAmount - b.totalAmount);
        break;
    }

    return filtered;
  }, [orders, status, dateRange, minAmount, maxAmount, sortOrder]);

  const totalFilteredPages = Math.ceil(
    filteredAndSortedOrders.length / PAGE_SIZE,
  );
  const filteredStart = (page - 1) * PAGE_SIZE;
  const filteredEnd = Math.min(
    filteredStart + PAGE_SIZE,
    filteredAndSortedOrders.length,
  );

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in');
      return;
    }
    if (user) loadOrders();
  }, [user, isLoaded, router]);

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [status, dateRange, minAmount, maxAmount, sortOrder]);

  const prevPage = useRef(page);

  useEffect(() => {
    if (page !== prevPage.current) {
      if (ordersRef.current) {
        ordersRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
    }
    prevPage.current = page;
  }, [page]);

  const loadOrders = async () => {
    try {
      const result = await fetchData<{ orders: Order[] }>('/api/orders');
      if (result?.orders) setOrders(result.orders);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoaded || isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex min-h-96 items-center justify-center">
          <Loader size={52} borderWidth="2px" color="black" />
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Order History</h1>
        <div className="py-16 text-center">
          <Package className="mx-auto mb-4 h-16 w-16 text-gray-400" />
          <h2 className="mb-2 text-xl font-semibold">No orders yet</h2>
          <p className="mb-6 text-gray-600">
            Start shopping to see your orders here
          </p>
          <Button onClick={() => router.push('/')}>Start Shopping</Button>
        </div>
      </div>
    );
  }

  if (filteredAndSortedOrders.length === 0) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Order History</h1>

        <OrdersFilters
          status={status}
          setStatus={setStatus}
          dateRange={dateRange}
          setDateRange={setDateRange}
          minAmount={minAmount}
          maxAmount={maxAmount}
          setMinAmount={setMinAmount}
          setMaxAmount={setMaxAmount}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />

        <div className="py-16 text-center">
          <Package className="mx-auto mb-4 h-16 w-16 text-gray-400" />
          <h2 className="mb-2 text-xl font-semibold">
            No orders match your filters
          </h2>
          <p className="mb-6 text-gray-600">
            Try adjusting your filters to see more orders
          </p>
          <Button
            onClick={() => {
              setStatus('');
              setDateRange('');
              setMinAmount(0);
              setMaxAmount(1000);
              setSortOrder('newest');
            }}
            variant="outline"
          >
            Clear Filters
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div ref={ordersRef} className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Order History</h1>

      <OrdersFilters
        status={status}
        setStatus={setStatus}
        dateRange={dateRange}
        setDateRange={setDateRange}
        minAmount={minAmount}
        maxAmount={maxAmount}
        setMinAmount={setMinAmount}
        setMaxAmount={setMaxAmount}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />

      <div className="space-y-6">
        {filteredAndSortedOrders
          .slice(filteredStart, filteredEnd)
          .map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
      </div>

      {/* Pagination controls */}
      <OrdersPagination
        page={page}
        setPage={setPage}
        totalFilteredPages={totalFilteredPages}
        filteredStart={filteredStart}
        filteredEnd={filteredEnd}
        totalFilteredOrders={filteredAndSortedOrders.length}
      />
    </div>
  );
}
