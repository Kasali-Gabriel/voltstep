'use client';

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useAdminSidebarStore } from '@/lib/state';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Input } from '../ui/input';
import { DataTablePagination } from './TablePagination';

declare module '@tanstack/react-table' {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface ColumnMeta<TData, TValue> {
    className?: string;
  }
}

export const defaultFormatColumnLabel = (id: string) => {
  // Special cases for complex accessor keys
  if (id === 'subcategory_category_catalog_name') return 'Catalog';
  if (id === 'subcategory_name') return 'Subcategory';
  if (id === 'avgRating') return 'Avg Rating';
  if (id === 'totalAmount') return 'Total Amount';
  if (id === 'firstName') return 'Name';
  if (id === 'popularityScore') return 'Popularity';
  if (id === 'createdAt') return 'Created On';
  if (id === 'images') return 'Image';

  // General formatting: convert camelCase and snake_case to readable text
  return id
    .replace(/([A-Z])/g, ' $1') // Add space before capital letters
    .replace(/^./, (str) => str.toUpperCase()) // Capitalize first letter
    .replace(/([a-z])([A-Z])/g, '$1 $2') // Add space between camelCase
    .replace(/_/g, ' ') // Replace underscores with spaces
    .replace(/\./g, ' ') // Replace dots with spaces
    .trim();
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  rowProps?: (row: Row<TData>) => React.HTMLAttributes<HTMLTableRowElement>;
  enableFiltering?: boolean;
  filterColumns?: string[];
  paginationMode?: 'client' | 'server';
  filteringMode?: 'client' | 'server';
  sortingMode?: 'client' | 'server';
  visibilityOptions?: boolean;
  children?: React.ReactNode;
  initialSorting?: SortingState;
  onPaginationChange?: (pagination: {
    pageIndex: number;
    pageSize: number;
  }) => void;
  onFilteringChange?: (filters: ColumnFiltersState) => void;
  onSortingChange?: (sorting: SortingState) => void;
  totalRows?: number;
  isLoading?: boolean;
  inputPlaceholder?: string;
  formatLabel?: (id: string) => string;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  rowProps,
  enableFiltering = false,
  filterColumns = [],
  paginationMode = 'client',
  filteringMode = 'client',
  sortingMode = 'client',
  visibilityOptions = false,
  children,
  initialSorting = [],
  onPaginationChange,
  onFilteringChange,
  onSortingChange,
  totalRows,
  isLoading = false,
  inputPlaceholder = 'Search...',
  formatLabel,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>(initialSorting);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});

  const { showSidebar } = useAdminSidebarStore();

  const labelFormatter = formatLabel || defaultFormatColumnLabel;

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel:
      paginationMode === 'client' ? getPaginationRowModel() : undefined,
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === 'function' ? updater(sorting) : updater;
      setSorting(newSorting);
      if (sortingMode === 'server') {
        onSortingChange?.(newSorting);
      }
    },
    getSortedRowModel: getSortedRowModel(), // Always enable for dynamic mode switching
    onColumnFiltersChange: (updater) => {
      const newFilters =
        typeof updater === 'function' ? updater(columnFilters) : updater;
      setColumnFilters(newFilters);
      if (filteringMode === 'server') {
        onFilteringChange?.(newFilters);
      }
    },
    getFilteredRowModel:
      filteringMode === 'client' ? getFilteredRowModel() : undefined,
    manualPagination: paginationMode === 'server',
    manualFiltering: filteringMode === 'server',
    manualSorting: sortingMode === 'server',
    pageCount:
      paginationMode === 'server'
        ? Math.ceil((totalRows || 0) / pageSize)
        : undefined,
    onPaginationChange: (updater) => {
      const newPagination =
        typeof updater === 'function'
          ? updater({ pageIndex, pageSize })
          : updater;
      setPageIndex(newPagination.pageIndex);
      setPageSize(newPagination.pageSize);
      if (paginationMode === 'server') {
        onPaginationChange?.(newPagination);
      }
    },
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: { pageIndex, pageSize },
    },
  });

  return (
    <div className="flex w-full max-w-full min-w-0 flex-col space-y-4 overflow-hidden">
      {enableFiltering && filterColumns.length > 0 && (
        <div
          className={`flex w-full flex-col-reverse gap-4 px-1 py-2 pb-2 md:max-w-[98%] ${showSidebar ? 'lg:flex-row lg:items-center lg:justify-between' : 'md:flex-row md:items-center md:justify-between'} `}
        >
          <div className="relative w-full min-w-0 flex-1 items-center justify-center">
            <Search
              size={16}
              strokeWidth={2}
              className="absolute top-1/2 left-3 size-5 -translate-y-1/2 transform text-neutral-600"
            />

            <Input
              type="search"
              placeholder={inputPlaceholder}
              value={
                (columnFilters.find((f) => f.value)?.value as string) || ''
              }
              onChange={(event) => {
                const value = event.target.value;
                // Apply the same filter value to all specified columns
                const newFilters = filterColumns.map((col) => ({
                  id: col,
                  value: value,
                }));
                // Update all filters at once
                table.setColumnFilters(newFilters);
              }}
              className={`h-9 w-full rounded-4xl pl-10 placeholder:text-xs sm:h-9 md:placeholder:text-sm ${
                showSidebar ? 'lg:w-[24rem]' : 'md:w-[24rem]'
              }`}
            />
          </div>

          <div className="flex w-full flex-shrink-0 items-center justify-end">
            <div
              className={`flex flex-row items-center justify-between gap-2 ${children && visibilityOptions && showSidebar ? 'w-full lg:w-fit' : ''}`}
            >
              {children}

              {visibilityOptions && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" className="ml-auto">
                      Columns
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {table
                      .getAllColumns()
                      .filter((column) => column.getCanHide())
                      .map((column) => {
                        return (
                          <DropdownMenuCheckboxItem
                            key={column.id}
                            className=""
                            checked={column.getIsVisible()}
                            onCheckedChange={(value) =>
                              column.toggleVisibility(!!value)
                            }
                          >
                            {labelFormatter(column.id)}
                          </DropdownMenuCheckboxItem>
                        );
                      })}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="flex justify-center">
                    <div className="border-primary h-6 w-6 animate-spin rounded-full border-b-2"></div>
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  {...(rowProps ? rowProps(row) : {})}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cell.column.columnDef.meta?.className || ''}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <DataTablePagination
        table={table}
        paginationMode={paginationMode}
        totalRows={totalRows}
      />
    </div>
  );
}
