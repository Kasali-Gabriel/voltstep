'use client';

import { SortableHeader } from '@/components/Tables/SortableHeader';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Customer } from '@/types/admin';
import { ColumnDef } from '@tanstack/react-table';
import { format } from 'date-fns';

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: 'firstName',
    enableSorting: true,
    header: ({ column }) => <SortableHeader column={column} title="Name" />,
    cell: ({ row }) => {
      const customer = row.original;
      return (
        <div className="flex items-center space-x-3">
          <Avatar className="size-8">
            <AvatarImage src={customer.imageUrl || ''} />

            <AvatarFallback>
              {customer.firstName[0]}

              {customer.lastName[0]}
            </AvatarFallback>
          </Avatar>

          <div>
            <div className="truncate font-medium">
              {customer.firstName} {customer.lastName}
            </div>
          </div>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      const firstName = row.original.firstName.toLowerCase();
      const lastName = row.original.lastName.toLowerCase();
      const searchValue = value.toLowerCase();
      return firstName.includes(searchValue) || lastName.includes(searchValue);
    },
  },

  {
    accessorKey: 'email',
    enableSorting: true,
    header: ({ column }) => <SortableHeader column={column} title="Email" />,
  },

  {
    accessorKey: 'createdAt',
    enableSorting: true,
    header: ({ column }) => (
      <SortableHeader column={column} title="Date Joined" />
    ),
    cell: ({ row }) => {
      try {
        return format(new Date(row.original.createdAt), 'MMM dd, yyyy');
      } catch (error) {
        console.error(
          'Error formatting created date:',
          error,
          row.original.createdAt,
        );
        return 'Invalid date';
      }
    },
    sortingFn: (rowA, rowB) => {
      const dateA = rowA.original.createdAt;
      const dateB = rowB.original.createdAt;

      // Handle null/undefined dates
      if (!dateA && !dateB) return 0;
      if (!dateA) return 1;
      if (!dateB) return -1;

      // Convert to Date objects for comparison
      const parsedDateA = new Date(dateA);
      const parsedDateB = new Date(dateB);

      // Handle invalid dates
      if (isNaN(parsedDateA.getTime()) && isNaN(parsedDateB.getTime()))
        return 0;
      if (isNaN(parsedDateA.getTime())) return 1;
      if (isNaN(parsedDateB.getTime())) return -1;

      // Compare timestamps - this will sort oldest to newest (ascending)
      return parsedDateA.getTime() - parsedDateB.getTime();
    },
  },
  {
    accessorKey: 'totalOrders',
    enableSorting: true,
    header: ({ column }) => (
      <SortableHeader column={column} title="Total Orders" />
    ),
    sortingFn: (rowA, rowB) => {
      const valueA = rowA.original.totalOrders || 0;
      const valueB = rowB.original.totalOrders || 0;
      return valueA - valueB; // Numeric comparison
    },
  },

  {
    accessorKey: 'totalReviews',
    enableSorting: true,
    header: ({ column }) => (
      <SortableHeader column={column} title="Total Reviews" />
    ),
    sortingFn: (rowA, rowB) => {
      const valueA = rowA.original.totalReviews || 0;
      const valueB = rowB.original.totalReviews || 0;
      return valueA - valueB; // Numeric comparison
    },
  },
  {
    accessorKey: 'totalSpent',
    enableSorting: true,
    header: ({ column }) => (
      <SortableHeader column={column} title="Total Spent" />
    ),
    cell: ({ row }) => `$${row.original.totalSpent.toFixed(2)}`,
    sortingFn: (rowA, rowB) => {
      const valueA = rowA.original.totalSpent || 0;
      const valueB = rowB.original.totalSpent || 0;
      return valueA - valueB; // Numeric comparison
    },
  },

  {
    accessorKey: 'lastActive',
    enableSorting: true,
    header: ({ column }) => (
      <SortableHeader column={column} title="Last Active" />
    ),
    cell: ({ row }) => {
      try {
        return format(new Date(row.original.lastActive), 'MMM dd, yyyy');
      } catch (error) {
        console.error(
          'Error formatting last active date:',
          error,
          row.original.lastActive,
        );
        return 'Invalid date';
      }
    },
    sortingFn: (rowA, rowB) => {
      const dateA = rowA.original.lastActive;
      const dateB = rowB.original.lastActive;

      // Handle null/undefined dates
      if (!dateA && !dateB) return 0;
      if (!dateA) return 1;
      if (!dateB) return -1;

      // Convert to Date objects for comparison
      const parsedDateA = new Date(dateA);
      const parsedDateB = new Date(dateB);

      // Handle invalid dates
      if (isNaN(parsedDateA.getTime()) && isNaN(parsedDateB.getTime()))
        return 0;
      if (isNaN(parsedDateA.getTime())) return 1;
      if (isNaN(parsedDateB.getTime())) return -1;

      // Compare timestamps - this will sort oldest to newest (ascending)
      return parsedDateA.getTime() - parsedDateB.getTime();
    },
  },
];
