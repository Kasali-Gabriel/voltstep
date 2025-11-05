'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const StatusFilter = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger className="w-36 rounded-lg border-gray-300">
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All Status</SelectItem>
        <SelectItem value="PENDING">Pending</SelectItem>
        <SelectItem value="CONFIRMED">Confirmed</SelectItem>
        <SelectItem value="PROCESSING">Processing</SelectItem>
        <SelectItem value="SHIPPED">Shipped</SelectItem>
        <SelectItem value="DELIVERED">Delivered</SelectItem>
        <SelectItem value="CANCELLED">Cancelled</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default StatusFilter;
