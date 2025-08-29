'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Loader from '@/components/ui/loader';
import { Separator } from '@/components/ui/separator';
import { useCartStore } from '@/hooks/use-cart';
import { fetchData } from '@/lib/fetch';
import { formatDate } from '@/lib/utils';
import { Order } from '@/types/order';
import { useUser } from '@clerk/nextjs';
import { OrderStatus } from '@prisma/client';
import {
  ArrowLeft,
  Calendar,
  CheckCircle,
  Home,
  Hourglass,
  MapPin,
  Package,
  RotateCcw,
  Truck,
  XCircle,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

const statusColors = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  CONFIRMED: 'bg-blue-100 text-blue-800',
  PROCESSING: 'bg-purple-100 text-purple-800',
  SHIPPED: 'bg-indigo-100 text-indigo-800',
  DELIVERED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
  REFUNDED: 'bg-gray-100 text-gray-800',
};

const statusIcons = {
  PENDING: Hourglass,
  CONFIRMED: CheckCircle,
  PROCESSING: Package,
  SHIPPED: Truck,
  DELIVERED: Home,
  CANCELLED: XCircle,
  REFUNDED: RotateCcw,
};

export default function OrderDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isLoaded } = useUser();
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { clearCart } = useCartStore();

  const loadOrder = useCallback(async () => {
    try {
      const result = await fetchData<{ order: Order }>(
        `/api/orders/${params.id}`,
      );
      if (result?.order) {
        setOrder(result.order);
      } else {
        router.push('/orders');
      }
    } catch (error) {
      console.error('Error loading order:', error);
      router.push('/orders');
    } finally {
      setIsLoading(false);
    }
  }, [params.id, router]);

  useEffect(() => {
    if (isLoaded && !user) {
      router.push('/sign-in');
      return;
    }

    if (user && params.id) {
      loadOrder();
    }
  }, [user, isLoaded, params.id, router, loadOrder]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('redirect_status') === 'succeeded') {
      clearCart();
    }
  }, [clearCart]);

  if (!isLoaded || isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex min-h-96 items-center justify-center">
          <Loader size={52} borderWidth="2px" color="black" />
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="py-16 text-center">
          <Package className="mx-auto mb-4 h-16 w-16 text-gray-400" />
          <h2 className="mb-2 text-xl font-semibold">Order not found</h2>
          <Button onClick={() => router.push('/orders')}>Back to Orders</Button>
        </div>
      </div>
    );
  }

  const StatusIcon = statusIcons[order.status];

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="mb-8 flex items-center gap-4">
        <button
          onClick={() => router.push('/orders')}
          className="flex cursor-pointer items-center gap-2 rounded-4xl border border-neutral-300 px-4 py-2 hover:border-black"
        >
          <ArrowLeft size={16} />
          Back to Orders
        </button>
      </div>

      {/* Order Header */}
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Package className="h-6 w-6" />
              Order #{order.id.slice(-8).toUpperCase()}
            </CardTitle>

            <Badge className={statusColors[order.status]}>
              <StatusIcon className="mr-1 h-4 w-4" />
              {order.status.toLowerCase().replace('_', ' ')}
            </Badge>
          </div>

          <div className="flex items-center gap-4 pl-8 text-gray-600">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              Placed on {formatDate(order.createdAt)}
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Left Column - Order Items */}
        <div className="space-y-6 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Order Items</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="space-y-4">
                {order.items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      width={80}
                      height={80}
                      className="h-20 w-20 rounded-lg object-cover"
                    />

                    <div className="flex-1">
                      <Link href={`/product/${item.product.slug}`}>
                        <h4 className="font-medium hover:underline hover:underline-offset-4">
                          {item.product.name}
                        </h4>
                      </Link>

                      <p className="text-sm text-gray-500">
                        {item.color} {item.size && `• ${item.size}`}
                      </p>

                      <p className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </p>

                      <p className="text-sm text-gray-500">
                        Price: ${item.price.toFixed(2)} each
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-lg font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Order Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-green-500"></div>
                  <div>
                    <p className="font-medium">Order Placed</p>
                    <p className="text-sm text-gray-500">
                      {formatDate(order.createdAt)}
                    </p>
                  </div>
                </div>

                {order.status !== OrderStatus.PENDING && (
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <div>
                      <p className="font-medium">Order Confirmed</p>
                      <p className="text-sm text-gray-500">
                        {formatDate(order.updatedAt)}
                      </p>
                    </div>
                  </div>
                )}

                {order.status === 'PROCESSING' && (
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <div>
                      <p className="font-medium">Processing</p>
                      <p className="text-sm text-gray-500">
                        Your order is being prepared
                      </p>
                    </div>
                  </div>
                )}

                {order.status === 'SHIPPED' && (
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <div>
                      <p className="font-medium">Shipped</p>
                      <p className="text-sm text-gray-500">
                        Your order is on its way
                      </p>
                    </div>
                  </div>
                )}

                {order.status === 'DELIVERED' && (
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                    <div>
                      <p className="font-medium">Delivered</p>
                      <p className="text-sm text-gray-500">
                        Your order has been delivered
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Order Details */}
        <div className="space-y-6">
          {/* Price Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
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
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Address */}
          {order.deliveryAddress && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {order.status === 'DELIVERED'
                    ? 'Delivered To'
                    : 'Delivery Address'}
                </CardTitle>
              </CardHeader>

              <CardContent>
                <div className="text-sm">
                  {order.deliveryAddress && (
                    <>
                      <p>
                        {order.deliveryAddress.firstName}{' '}
                        {order.deliveryAddress.lastName}
                      </p>

                      <p className="font-medium">
                        {order.deliveryAddress.addressLine1}
                      </p>
                      {order.deliveryAddress.addressLine2 && (
                        <p>{order.deliveryAddress.addressLine2}</p>
                      )}

                      <p className="text-neutral-600">
                        {order.deliveryAddress.city},{' '}
                        {order.deliveryAddress.state}{' '}
                        {order.deliveryAddress.zipCode}
                      </p>

                      <p className="text-neutral-600">
                        {order.deliveryAddress.country}
                      </p>

                      <p>{order.deliveryAddress.phone}</p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
