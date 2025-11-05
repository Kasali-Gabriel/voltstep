'use client';

import { SortableHeader } from '@/components/Tables/SortableHeader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDate, parseGuestDeliveryAddress } from '@/lib/utils';
import { Order } from '@/types/order';
import { ColumnDef } from '@tanstack/react-table';

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'delivered':
      return 'bg-green-100 text-green-800 border border-green-200';
    case 'shipped':
      return 'bg-indigo-100 text-indigo-800 border border-indigo-200';
    case 'processing':
      return 'bg-purple-100 text-purple-800 border border-purple-200';
    case 'confirmed':
      return 'bg-blue-100 text-blue-800 border border-blue-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
    case 'cancelled':
      return 'bg-red-100 text-red-800 border border-red-200';
    case 'refunded':
      return 'bg-gray-100 text-gray-800 border border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border border-gray-200';
  }
};

const getPaymentStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'succeeded':
      return 'bg-green-100 text-green-800 border border-green-200';
    case 'pending':
      return 'bg-yellow-100 text-yellow-800 border border-yellow-200';
    case 'failed':
      return 'bg-red-100 text-red-800 border border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border border-gray-200';
  }
};

export const columns: ColumnDef<Order>[] = [
  {
    accessorKey: 'id',
    header: 'Order ID',
    cell: ({ row }) => (
      <div className="font-medium">#{row.original.id.slice(-8)}</div>
    ),
  },

  {
    accessorKey: 'user',
    header: 'Customer',
    cell: ({ row }) => {
      const order = row.original;
      const user = order.user;
      const guestAddress = parseGuestDeliveryAddress(
        order.guestDeliveryAddress || null,
      );

      const firstName = user?.firstName || guestAddress?.firstName || 'Guest';
      const lastName = user?.lastName || guestAddress?.lastName || '';
      const email = user?.email || guestAddress?.email || '';

      return (
        <div className="flex items-center space-x-3">
          <Avatar className="size-8">
            <AvatarImage src={user?.imageUrl || ''} />
            <AvatarFallback>
              {firstName[0]}
              {lastName[0]}
            </AvatarFallback>
          </Avatar>

          <div>
            <div className="truncate font-medium">
              {firstName} {lastName}
            </div>

            <div className="truncate text-sm text-gray-500">{email}</div>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge className={getStatusColor(row.original.status)}>
        {row.original.status}
      </Badge>
    ),
  },

  {
    accessorKey: 'paymentStatus',
    header: 'Payment',
    cell: ({ row }) => (
      <Badge className={getPaymentStatusColor(row.original.paymentStatus)}>
        {row.original.paymentStatus}
      </Badge>
    ),
  },

  {
    accessorKey: 'confirmedAt',
    enableSorting: true,
    header: ({ column }) => (
      <SortableHeader column={column} title="Placed On" />
    ),
    cell: ({ row }) => {
      const date = row.original.confirmedAt || row.original.createdAt;

      return formatDate(date);
    },
    sortingFn: (rowA, rowB) => {
      const dateA = rowA.original.confirmedAt || rowA.original.createdAt;
      const dateB = rowB.original.confirmedAt || rowB.original.createdAt;

      // Convert to Date objects if they're strings
      const timeA = new Date(dateA).getTime();
      const timeB = new Date(dateB).getTime();

      return timeA - timeB;
    },
  },

  {
    accessorKey: 'deliveredAt',
    enableSorting: true,
    header: ({ column }) => (
      <SortableHeader column={column} title="Delivered On" />
    ),
    cell: ({ row }) => {
      const order = row.original;
      let deliveredDate = order.deliveredAt;

      // If status is DELIVERED but no deliveredAt date, use updatedAt
      if (order.status === 'DELIVERED' && !deliveredDate) {
        deliveredDate = order.updatedAt;
      }

      const date = formatDate(deliveredDate ?? '');

      return (
        <div className="text-sm text-gray-600">
          {deliveredDate ? date : 'Not delivered'}
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const orderA = rowA.original;
      const orderB = rowB.original;

      // Check if orders are delivered
      const isDeliveredA = orderA.status === 'DELIVERED' || orderA.deliveredAt;
      const isDeliveredB = orderB.status === 'DELIVERED' || orderB.deliveredAt;

      // Only show delivered orders when sorting by deliveredAt
      // Non-delivered orders go to the bottom
      if (!isDeliveredA && !isDeliveredB) return 0;
      if (!isDeliveredA) return 1; // A goes to bottom
      if (!isDeliveredB) return -1; // B goes to bottom

      // Both are delivered, sort by delivery date
      let dateA = orderA.deliveredAt;
      let dateB = orderB.deliveredAt;

      // If status is DELIVERED but no deliveredAt date, use updatedAt
      if (orderA.status === 'DELIVERED' && !dateA) {
        dateA = orderA.updatedAt;
      }
      if (orderB.status === 'DELIVERED' && !dateB) {
        dateB = orderB.updatedAt;
      }

      const timeA = new Date(dateA || 0).getTime();
      const timeB = new Date(dateB || 0).getTime();

      return timeA - timeB;
    },
  },
  {
    accessorKey: 'totalAmount',
    enableSorting: true,
    header: ({ column }) => (
      <SortableHeader column={column} title="Total Amount" />
    ),
    cell: ({ row }) => `$${row.original.totalAmount.toFixed(2)}`,
    sortingFn: (rowA, rowB) => {
      const valueA = rowA.original.totalAmount || 0;
      const valueB = rowB.original.totalAmount || 0;
      return valueA - valueB;
    },
  },
];
