'use client';

import { SortableHeader } from '@/components/Tables/SortableHeader';
import { Badge } from '@/components/ui/badge';
import { CustomerOrder } from '@/types/admin';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case 'delivered':
      return 'bg-green-100 text-green-800';
    case 'shipped':
      return 'bg-blue-100 text-blue-800';
    case 'processing':
      return 'bg-yellow-100 text-yellow-800';
    case 'pending':
      return 'bg-gray-100 text-gray-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const columns: ColumnDef<CustomerOrder>[] = [
  {
    accessorKey: 'id',
    header: 'Order ID',
    cell: ({ row }) => (
      <div className="font-medium">#{row.original.id.slice(-8)}</div>
    ),
  },
  
  {
    accessorKey: 'totalAmount',
    enableSorting: true,
    header: ({ column }) => (
      <SortableHeader column={column} title="Total Price" />
    ),
    cell: ({ row }) => (
      <div className="font-medium">${row.original.totalAmount.toFixed(2)}</div>
    ),
  },
  
  {
    accessorKey: 'createdAt',
    enableSorting: true,
    header: ({ column }) => (
      <SortableHeader column={column} title="Date Ordered" />
    ),
    cell: ({ row }) => (
      <div className="text-sm text-gray-600">
        {format(row.original.createdAt, 'MMM dd, yyyy')}
      </div>
    ),
  },
  
  {
    accessorKey: 'deliveredAt',
    enableSorting: true,
    header: ({ column }) => (
      <SortableHeader column={column} title="Date delivered" />
    ),
    cell: ({ row }) => (
      <div className="text-sm text-gray-600">
        {row.original.deliveredAt
          ? format(row.original.deliveredAt, 'MMM dd, yyyy')
          : 'Not delivered'}
      </div>
    ),
  },

  {
    accessorKey: 'status',
    header: 'Order Status',
    cell: ({ row }) => (
      <Badge className={getStatusColor(row.original.status)}>
        {row.original.status}
      </Badge>
    ),
  },
];
