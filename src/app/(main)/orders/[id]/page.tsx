import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { fetchData } from '@/lib/fetch';
import { formatDate } from '@/lib/utils';
import { Order } from '@/types/order';
import {
  Calendar,
  CheckCircle,
  Home,
  Hourglass,
  Package,
  RotateCcw,
  Truck,
  XCircle,
} from 'lucide-react';

import { BackButton } from '@/components/Buttons/BackButton';
import OrderDeliveryAddress from '@/components/User/Orders/OrderDeliveryAddress';
import OrderItems from '@/components/User/Orders/OrderItems';
import OrderTimeline from '@/components/User/Orders/OrderTimeline';
import { redirect } from 'next/navigation';

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

const OrderDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const param = await params;
  const orderId = param.id;

  const response = await fetchData<{ order: Order }>(`/api/orders/${orderId}`);

  if (!response || !response.order) {
    redirect('/orders');
  }

  const { order } = response;

  const StatusIcon = statusIcons[order.status as keyof typeof statusIcons];

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <div className="mb-8 flex items-center gap-4">
        <BackButton />
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
          <OrderItems items={order.items} />

          {/* Order Timeline */}
          <OrderTimeline order={order} />
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
          <OrderDeliveryAddress
            deliveryAddress={order.deliveryAddress}
            status={order.status}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
