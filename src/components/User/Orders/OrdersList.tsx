'use client';

import { Pagination, usePagination } from '@/components/Navigation/Pagination';
import { Button } from '@/components/ui/button';
import OrderCard from '@/components/User/Orders/OrderCard';
import { OrdersFilters } from '@/components/User/Orders/OrdersFilters';
import { Order } from '@/types/order';
import { Package } from 'lucide-react';
import { useEffect, useMemo, useRef, useState } from 'react';

const PAGE_SIZE = 5;

const OrdersList = ({ orders }: { orders: Order[] }) => {
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

  const pagination = usePagination({
    totalItems: filteredAndSortedOrders.length,
    pageSize: PAGE_SIZE,
    initialPage: 1,
    scrollRef: ordersRef,
  });

  // Reset page when filters change
  const prevFiltersRef = useRef({
    status,
    dateRange,
    minAmount,
    maxAmount,
    sortOrder,
  });

  useEffect(() => {
    const prevFilters = prevFiltersRef.current;
    if (
      prevFilters.status !== status ||
      prevFilters.dateRange !== dateRange ||
      prevFilters.minAmount !== minAmount ||
      prevFilters.maxAmount !== maxAmount ||
      prevFilters.sortOrder !== sortOrder
    ) {
      pagination.setPage(1);
      prevFiltersRef.current = {
        status,
        dateRange,
        minAmount,
        maxAmount,
        sortOrder,
      };
    }
  });

  if (filteredAndSortedOrders.length === 0) {
    return (
      <>
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
            className="gap-2 rounded-4xl"
          >
            Clear Filters
          </Button>
        </div>
      </>
    );
  }

  return (
    <>
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

      <div ref={ordersRef} className="space-y-6">
        {filteredAndSortedOrders
          .slice(pagination.start, pagination.end)
          .map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
      </div>

      {/* Pagination controls */}
      <Pagination
        page={pagination.page}
        setPage={pagination.setPage}
        totalPages={pagination.totalPages}
        start={pagination.start}
        end={pagination.end}
        totalItems={pagination.totalItems}
        itemLabel="orders"
      />
    </>
  );
};

export default OrdersList;
