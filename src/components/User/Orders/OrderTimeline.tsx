import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { Order } from '@/types/order';
import { OrderStatus } from '@prisma/client';

const OrderTimeline = ({ order }: { order: Order }) => {
  const status = order.status as OrderStatus;
  const { updatedAt, confirmedAt, shippedAt, deliveredAt, cancelledAt } = order;

  return (
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

          {status !== OrderStatus.PENDING && (
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <div>
                <p className="font-medium">Order Confirmed</p>
                <p className="text-sm text-gray-500">
                  {confirmedAt
                    ? formatDate(confirmedAt)
                    : formatDate(updatedAt)}
                </p>
              </div>
            </div>
          )}

          {status === 'PROCESSING' && (
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

          {status === 'SHIPPED' && (
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <div>
                <p className="font-medium">Shipped</p>
                <p className="text-sm text-gray-500">
                  {deliveredAt
                    ? `Your order was shipped on ${shippedAt ? formatDate(shippedAt) : ''}`
                    : shippedAt
                      ? `Your order is on its way (shipped on ${formatDate(shippedAt)})`
                      : 'Your order is on its way'}
                </p>
              </div>
            </div>
          )}

          {status === 'DELIVERED' && (
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <div>
                <p className="font-medium">Delivered</p>
                <p className="text-sm text-gray-500">
                  {deliveredAt
                    ? `Your order was delivered on ${formatDate(deliveredAt)}`
                    : 'Your order has been delivered'}
                </p>
              </div>
            </div>
          )}

          {status === 'CANCELLED' && (
            <div className="flex items-center gap-3">
              <div className="h-2 w-2 rounded-full bg-red-500"></div>
              <div></div>
              <p className="font-medium">Cancelled</p>
              <p className="text-sm text-gray-500">
                {cancelledAt
                  ? `Your order was cancelled on ${formatDate(cancelledAt)}`
                  : 'Your order has been cancelled'}
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderTimeline;
