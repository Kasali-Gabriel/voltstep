'use client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { OrderStatus } from '@/types/order';
import axios from 'axios';
import { Check, ChevronDown } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

const validTransitions: Record<OrderStatus, OrderStatus[]> = {
  PENDING: ['CONFIRMED', 'CANCELLED'],
  CONFIRMED: ['PROCESSING', 'CANCELLED'],
  PROCESSING: ['SHIPPED'],
  SHIPPED: ['DELIVERED'],
  DELIVERED: [],
  CANCELLED: [],
};

const OrderStatusChange = ({
  orderId,
  currentStatus,
}: {
  orderId: string;
  currentStatus: OrderStatus;
}) => {
  const [status, setStatus] = useState<OrderStatus>(currentStatus);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = async (newStatus: string) => {
    setLoading(true);
    try {
      const res = await axios.put(`/api/orders/${orderId}`, {
        status: newStatus,
      });
      if (res.status === 200) {
        setStatus(newStatus as OrderStatus);
        router.refresh();
        toast.success('Order status updated');
      } else {
        toast.error('Failed to update status');
      }
    } catch {
      toast.error('Error updating status');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="ml-2 flex h-9 w-[9.5rem] cursor-pointer items-center justify-between gap-2 rounded-xl border px-3 text-left text-sm hover:bg-neutral-100 disabled:pointer-events-none disabled:opacity-50"
          disabled={loading || status === 'DELIVERED' || status === 'CANCELLED'}
        >
          Change Status
          <ChevronDown className="size-5" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-[9.5rem]">
        {validTransitions[status]?.map((option) => (
          <DropdownMenuItem
            key={option}
            className="relative flex w-full cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-none select-none focus:bg-neutral-200 data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
            onClick={() => handleChange(option)}
            disabled={loading || option === status}
          >
            <span className="absolute right-2 flex size-3.5 items-center justify-center">
              {option === status && <Check />}
            </span>
            {option.charAt(0) + option.slice(1).toLowerCase()}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrderStatusChange;
