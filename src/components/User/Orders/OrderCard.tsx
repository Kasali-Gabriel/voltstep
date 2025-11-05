'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { Order } from '@/types/order';
import { ArrowRight, Calendar, Package } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-blue-100 text-blue-800',
  PROCESSING: 'bg-purple-100 text-purple-800',
  SHIPPED: 'bg-indigo-100 text-indigo-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
  REFUNDED: 'bg-gray-100 text-gray-800',
};

const OrderCard = ({ order }: { order: Order }) => {
  const router = useRouter();

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Order #{order.id.slice(-8).toUpperCase()}
          </CardTitle>
          <Badge className={statusColors[order.status]}>
            {order.status.toLowerCase().replace('_', ' ')}
          </Badge>
        </div>

        <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {formatDate(order.createdAt)}
          </div>
          <span className="font-medium">${order.totalAmount.toFixed(2)}</span>
        </div>
      </CardHeader>

      <CardContent>
        {/* Thumbnails preview */}
        <div className="flex gap-3 overflow-x-auto pb-2">
          {order.items.slice(0, 3).map((item) => (
            <Image
              key={item.id}
              src={item.product.images[0]}
              alt={item.product.name}
              width={64}
              height={64}
              className="h-16 w-16 rounded-lg object-cover"
            />
          ))}
          {order.items.length > 3 && (
            <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-gray-100 text-sm font-medium text-gray-600">
              +{order.items.length - 3}
            </div>
          )}
        </div>

        <div className="mt-4 flex justify-end">
          <button
            onClick={() => router.push(`/orders/${order.id}`)}
            className="flex cursor-pointer items-center gap-2 rounded-4xl bg-black px-4 py-2 text-sm text-white hover:bg-neutral-900"
          >
            View Details
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}

export default OrderCard;
