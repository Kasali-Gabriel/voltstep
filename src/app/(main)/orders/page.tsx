'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { fetchData } from '@/lib/fetch';
import { formatDate } from '@/lib/utils';
import { Order } from '@/types/order';
import { useUser } from '@clerk/nextjs';
import { ArrowRight, Calendar, MapPin, Package } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-blue-100 text-blue-800',
  PROCESSING: 'bg-purple-100 text-purple-800',
  SHIPPED: 'bg-indigo-100 text-indigo-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
  REFUNDED: 'bg-gray-100 text-gray-800',
};

export default function OrdersPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in');
      return;
    }

    if (user) {
      loadOrders();
    }
  }, [user, isLoaded, router]);

  const loadOrders = async () => {
    try {
      const result = await fetchData<{ orders: Order[] }>('/api/orders');
      if (result?.orders) {
        setOrders(result.orders);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isLoaded || isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex min-h-96 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-black"></div>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Order History</h1>
        <div className="py-16 text-center">
          <Package className="mx-auto mb-4 h-16 w-16 text-gray-400" />
          <h2 className="mb-2 text-xl font-semibold">No orders yet</h2>
          <p className="mb-6 text-gray-600">
            Start shopping to see your orders here
          </p>
          <Button onClick={() => router.push('/')}>Start Shopping</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Order History</h1>

      <div className="space-y-6">
        {orders.map((order) => (
          <Card key={order.id} className="overflow-hidden">
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
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDate(order.createdAt)}
                </div>
                <div className="flex items-center gap-1">
                  <span className="font-medium">
                    ${order.totalAmount.toFixed(2)}
                  </span>
                </div>
              </div>
            </CardHeader>

            <CardContent>
              {/* Order Items */}
              <div className="mb-6 space-y-3">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.product.name}</h4>
                      <p className="text-sm text-gray-500">
                        {item.color} {item.size && `• ${item.size}`}
                      </p>
                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity} • ${item.price.toFixed(2)} each
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              {/* Order Details */}
              <div className="grid grid-cols-1 gap-4 text-sm md:grid-cols-2">
                {order.deliveryAddress && (
                  <div>
                    <h5 className="mb-2 flex items-center gap-1 font-medium">
                      <MapPin className="h-4 w-4" />
                      Delivery Address
                    </h5>
                    <div className="text-gray-600">
                      <p>
                        {order.deliveryAddress.firstName}{' '}
                        {order.deliveryAddress.lastName}
                      </p>
                      <p>{order.deliveryAddress.addressLine1}</p>
                      {order.deliveryAddress.addressLine2 && (
                        <p>{order.deliveryAddress.addressLine2}</p>
                      )}
                      <p>
                        {order.deliveryAddress.city},{' '}
                        {order.deliveryAddress.state}{' '}
                        {order.deliveryAddress.zipCode}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="mt-4 border-t pt-4">
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>
                      $
                      {(
                        order.totalAmount -
                        order.shippingCost -
                        order.taxAmount
                      ).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${order.shippingCost.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${order.taxAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between border-t pt-1 font-medium">
                    <span>Total</span>
                    <span>${order.totalAmount.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-6 flex justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => router.push(`/orders/${order.id}`)}
                  className="flex items-center gap-2"
                >
                  View Details
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
