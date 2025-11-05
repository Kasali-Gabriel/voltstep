import { Table } from '@tanstack/react-table';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { Button } from '../ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import DeleteRow from './DeleteRow';

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  paginationMode?: 'client' | 'server';
  totalRows?: number;
}

export function DataTablePagination<TData>({
  table,
  paginationMode = 'client',
  totalRows,
}: DataTablePaginationProps<TData>) {
  return (
    <div className="flex w-full flex-col space-y-4 md:flex-row md:space-y-0">
      <div className="flex flex-1 items-center justify-between">
        {table.getFilteredSelectedRowModel().rows.length > 0 ? (
          <div className="text-muted-foreground flex-1 text-sm">
            {table.getFilteredSelectedRowModel().rows.length} of{' '}
            {table.getFilteredRowModel().rows.length} row(s) selected.
          </div>
        ) : (
          <div className="text-muted-foreground flex-1 text-sm">
            {paginationMode === 'server'
              ? (totalRows ?? 0)
              : table.getFilteredRowModel().rows.length}{' '}
            row(s).
          </div>
        )}

        <div className="flex items-center space-x-2">
          <p className="text-sm font-medium">Rows per page</p>
          <Select
            value={`${table.getState().pagination.pageSize}`}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>

            <SelectContent side="top">
              {[10, 20, 25, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {table.getFilteredSelectedRowModel().rows.length > 0 ? (
        <div className="flex w-full justify-end">
          <DeleteRow />
        </div>
      ) : (
        <div className="flex items-center justify-between md:justify-start md:space-x-4 lg:space-x-8">
          <div className="flex w-[100px] items-center text-sm font-medium md:justify-center">
            Page {table.getState().pagination.pageIndex + 1} of{' '}
            {paginationMode === 'server'
              ? Math.ceil(
                  (totalRows || 0) / table.getState().pagination.pageSize,
                )
              : table.getPageCount()}
          </div>

          <div className="flex items-center space-x-2">
            {table.getCanPreviousPage() && (
              <Button
                variant="outline"
                size="icon"
                className="hidden size-8 lg:flex"
                onClick={() => table.setPageIndex(0)}
              >
                <span className="sr-only">Go to first page</span>
                <ChevronsLeft />
              </Button>
            )}

            {table.getCanPreviousPage() && (
              <Button
                variant="outline"
                size="icon"
                className="size-8"
                onClick={() => table.previousPage()}
              >
                <span className="sr-only">Go to previous page</span>
                <ChevronLeft />
              </Button>
            )}

            {table.getCanNextPage() && (
              <Button
                variant="outline"
                size="icon"
                className="size-8"
                onClick={() => table.nextPage()}
              >
                <span className="sr-only">Go to next page</span>
                <ChevronRight />
              </Button>
            )}

            {table.getCanNextPage() && (
              <Button
                variant="outline"
                size="icon"
                className="hidden size-8 lg:flex"
                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              >
                <span className="sr-only">Go to last page</span>
                <ChevronsRight />
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
