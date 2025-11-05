import { Column } from '@tanstack/react-table';
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react';

export const SortableHeader = <TData,>({
  column,
  title,
}: {
  column: Column<TData>;
  title: string;
}) => {
  const isSorted = column.getIsSorted();
  return (
    <button
      onClick={() => column.toggleSorting()}
      className="flex h-auto w-fit cursor-pointer items-center justify-between space-x-2 font-medium transition-colors hover:text-neutral-800"
    >
      <span>{title}</span>
      {isSorted === 'asc' ? (
        <ChevronUp className="h-4 w-4" />
      ) : isSorted === 'desc' ? (
        <ChevronDown className="h-4 w-4" />
      ) : (
        <ChevronsUpDown className="h-4 w-4 text-gray-400" />
      )}
    </button>
  );
};
