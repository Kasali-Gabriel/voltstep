'use client';

import { SortableHeader } from '@/components/Tables/SortableHeader';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { formatDate } from '@/lib/utils';
import { Product } from '@/types/product';
import { Tag } from '@prisma/client';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

export const getProductColumns = (
  showCategorySubcategory: boolean,
): ColumnDef<Product>[] => {
  const columns: ColumnDef<Product>[] = [
    {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && 'indeterminate')
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="scale-85 cursor-pointer"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="scale-85 cursor-pointer"
          onClick={(e) => e.stopPropagation()}
        />
      ),
      enableSorting: false,
      enableHiding: false,
      meta: {
        className: 'select-column cursor-default',
      },
    },
    {
      accessorKey: 'images',
      header: 'Image',
      cell: ({ row }) => {
        const images = row.getValue('images') as string[];
        return (
          <div className="relative h-16 w-16">
            {images && images.length > 0 ? (
              <Image
                src={images[0]}
                alt={row.getValue('name')}
                fill
                className="rounded object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center rounded bg-gray-200">
                <span className="text-xs text-gray-500">No image</span>
              </div>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'name',
      header: ({ column }) => <SortableHeader column={column} title="Name" />,
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('name')}</div>
      ),
    },
  ];

  if (showCategorySubcategory) {
    columns.push({
      accessorKey: 'subcategory.category.catalog.name',
      header: 'Catalog',
      cell: ({ row }) => (
        <Badge variant="outline">
          {row.original.subcategory?.category?.catalog?.name}
        </Badge>
      ),
    });
    columns.push({
      accessorKey: 'subcategory.name',
      header: 'Subcategory',
      cell: ({ row }) => (
        <div className="text-sm">{row.original.subcategory?.name}</div>
      ),
    });
  }

  columns.push(
    {
      accessorKey: 'price',
      header: ({ column }) => <SortableHeader column={column} title="Price" />,
      cell: ({ row }) => {
        const price = parseFloat(row.getValue('price'));
        return <div className="font-medium">${price.toFixed(2)}</div>;
      },
    },
    {
      accessorKey: 'quantity',
      header: ({ column }) => (
        <SortableHeader column={column} title="Quantity" />
      ),
      cell: ({ row }) => (
        <div className="text-center">{row.getValue('quantity')}</div>
      ),
    },
    {
      accessorKey: 'tags',
      header: 'Tags',
      cell: ({ row }) => {
        const tags = row.getValue('tags') as Tag[];
        return (
          <div className="flex flex-wrap gap-1">
            {tags && tags.length > 0 ? (
              tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag.replace('_', ' ').toLowerCase()}
                </Badge>
              ))
            ) : (
              <span className="text-sm text-gray-400">No tags</span>
            )}
          </div>
        );
      },
    },
    {
      accessorKey: 'avgRating',
      header: ({ column }) => (
        <SortableHeader column={column} title="Avg Rating" />
      ),
      cell: ({ row }) => {
        const rating = row.getValue('avgRating') as number;
        return (
          <div className="flex items-center gap-1">
            <span className="font-medium">{rating.toFixed(1)}</span>
            <span className="text-yellow-500">★</span>
          </div>
        );
      },
    },
    {
      accessorKey: 'createdAt',
      header: ({ column }) => (
        <SortableHeader column={column} title="Created On" />
      ),
      cell: ({ row }) => {
        const date = new Date(row.getValue('createdAt'));
        return <div className="text-sm">{formatDate(date)}</div>;
      },
    },
    {
      accessorKey: 'popularityScore',
      header: ({ column }) => (
        <SortableHeader column={column} title="Popularity" />
      ),
      cell: ({ row }) => {
        const score = row.getValue('popularityScore') as number;
        return <div className="text-sm">{score.toFixed(2)}</div>;
      },
    },
  );

  return columns;
};
