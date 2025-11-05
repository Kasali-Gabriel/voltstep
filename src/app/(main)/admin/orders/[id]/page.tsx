import { getOrderById } from '@/actions/order';
import OrderStatusChange from '@/components/Admin/Orders/StatusChange';
import { BackButton } from '@/components/Buttons/BackButton';
import { CopyButton } from '@/components/Buttons/CopyButton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { formatDate, parseGuestDeliveryAddress } from '@/lib/utils';
import { OrderItem } from '@/types/order';
import { Calendar, CreditCard, MapPin, User } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const statusColors: Record<string, string> = {
  PENDING: 'bg-yellow-100 text-yellow-800 border border-yellow-200',

  CONFIRMED: 'bg-blue-100 text-blue-800 border border-blue-200',

  PROCESSING: 'bg-purple-100 text-purple-800 border border-purple-200',

  SHIPPED: 'bg-indigo-100 text-indigo-800 border border-indigo-200',

  DELIVERED: 'bg-green-100 text-green-800 border border-green-200',

  CANCELLED: 'bg-red-100 text-red-800 border border-red-200',
};

const OrderDetailsPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const resolvedParams = await params;

  const { order } = await getOrderById(resolvedParams.id);
  if (!order) {
    redirect('/admin/orders/manage');
  }

  const userId = order.user?.id;

  const parsedAddress = order.guestDeliveryAddress
    ? parseGuestDeliveryAddress(order.guestDeliveryAddress)
    : null;
  const displayAddress = order.deliveryAddress || parsedAddress;

  const paymentDetails = order.stripePaymentMethodDetails
    ? typeof order.stripePaymentMethodDetails === 'string'
      ? JSON.parse(order.stripePaymentMethodDetails)
      : order.stripePaymentMethodDetails
    : null;

  return (
    <div className="w-full space-y-8">
      <div className="flex w-full items-center justify-between">
        <BackButton />

        <OrderStatusChange orderId={order.id} currentStatus={order.status} />
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">
          Order #{order.id.slice(-8).toUpperCase()}
        </h2>

        <Badge
          className={`${statusColors[order.status]} rounded-full px-3 py-1 text-xs font-medium capitalize`}
        >
          {order.status.toLowerCase().replace('_', ' ')}
        </Badge>
      </div>

      {/* Summary - leaner grid instead of big cards */}
      <div className="grid grid-cols-1 gap-6 text-sm md:grid-cols-3">
        <div className="flex flex-col justify-between rounded-md border p-4">
          <div className="flex items-center gap-2 text-gray-500">
            <Calendar className="size-4" />

            <span className="mt-0.5">Placed On</span>
          </div>

          <p className="mt-1 text-lg font-medium">
            {formatDate(order.createdAt)}
          </p>
        </div>

        <div className="flex flex-col justify-between rounded-md border p-4">
          <div className="flex items-center gap-2 text-gray-500">
            <User className="h-4 w-4" />

            <span>Customer</span>
          </div>

          <div className="mt-1 font-medium">
            <Link
              href={`/admin/customers/${userId}`}
              className={`flex w-auto items-center space-x-2 rounded-2xl px-2 py-1 hover:bg-neutral-100 ${userId ? 'cursor-pointer' : 'pointer-events-none cursor-default'}`}
            >
              <Avatar className="size-9">
                <AvatarImage src={order.user?.imageUrl || ''} />

                <AvatarFallback>
                  {order.user?.firstName?.[0] ||
                    parsedAddress?.firstName?.[0] ||
                    ''}
                  {order.user?.lastName?.[0] ||
                    parsedAddress?.lastName?.[0] ||
                    ''}
                </AvatarFallback>
              </Avatar>

              <p className="flex flex-col">
                <span>
                  {order.user?.firstName || parsedAddress?.firstName}{' '}
                  {order.user?.lastName || parsedAddress?.lastName}
                </span>

                <span className="flex items-center gap-1 text-gray-500">
                  {order.user?.email || parsedAddress?.email}
                </span>
              </p>
            </Link>
          </div>
        </div>

        <div className="flex flex-col justify-between rounded-md border p-4">
          <div className="flex items-center gap-2 text-gray-500">
            <CreditCard className="h-4 w-4" />

            <span>Total</span>
          </div>

          <p className="mt-1 text-xl font-semibold">
            ${order.totalAmount.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Items */}
      <div>
        <h3 className="mb-3 text-lg font-semibold">Order Items</h3>

        <div className="divide-y rounded-md border">
          {order.items.map((item: OrderItem) => (
            <div key={item.id} className="flex items-center gap-4 p-3">
              <Image
                src={
                  item.product.images[0] ??
                  '/productImages/captain-america-4k-artworks-dl.jpg'
                }
                alt={item.product.name}
                width={56}
                height={56}
                className="size-14 rounded-md object-cover"
              />

              <div className="flex flex-1 flex-col">
                <Link
                  href={`/admin/inventory/products/${item.product.slug}`}
                  className="font-medium hover:underline md:text-lg"
                >
                  {item.product.name}
                </Link>

                <p className="hidden text-base text-gray-500 md:block">
                  {item.color} {item.size && `• ${item.size}`} • Qty:{' '}
                  {item.quantity}
                </p>

                <div className="mt-1 flex w-full flex-1 items-center justify-between md:hidden">
                  <p className="text-gray-500">Qty: {item.quantity}</p>

                  <p className="font-medium text-neutral-700">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>

              <p className="hidden font-medium text-neutral-700 md:block">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Delivery Info */}
        {displayAddress && (
          <div>
            <h3 className="mb-2 text-lg font-semibold text-black">
              {order.status === 'DELIVERED'
                ? `Delivered on ${(() => {
                    const deliveredDate =
                      order.deliveredAt ||
                      (order.status === 'DELIVERED' ? order.updatedAt : null);
                    return deliveredDate ? formatDate(deliveredDate) : '';
                  })()} to`
                : ' Delivery Address'}
            </h3>

            <div className="rounded-md border p-4 text-sm leading-relaxed text-gray-700">
              <div className="flex items-start gap-2">
                <MapPin className="mt-1 size-4 text-gray-500" />

                <address className="not-italic">
                  {displayAddress.addressLine1}
                  <br />
                  {displayAddress.city}, {displayAddress.state}{' '}
                  {displayAddress.zipCode}
                  <br />
                  {displayAddress.country}
                  <br />
                  {displayAddress.phone}
                </address>
              </div>
            </div>
          </div>
        )}

        {/* Payment Details */}
        <div>
          <h3 className="mb-2 text-lg font-semibold">Payment Details</h3>

          <div className="rounded-md border p-4 text-sm leading-relaxed text-gray-700">
            <dl className="space-y-3">
              {/* Method Type */}
              {order.stripePaymentMethodType && (
                <div className="flex items-center gap-2">
                  <dt className="font-medium">Method:</dt>
                  <dd>{order.stripePaymentMethodType}</dd>
                </div>
              )}

              {/* Brand */}
              {paymentDetails?.brand && (
                <div className="flex items-center gap-2">
                  <dt className="font-medium">Brand:</dt>
                  <dd className="capitalize">{paymentDetails.brand}</dd>
                </div>
              )}

              {/* Last 4 */}
              {paymentDetails?.last4 && (
                <div className="flex items-center gap-2">
                  <dt className="font-medium">Last 4:</dt>
                  <dd>**** {paymentDetails.last4}</dd>
                </div>
              )}

              {/* Expiry */}
              {paymentDetails?.exp_month && paymentDetails?.exp_year && (
                <div className="flex items-center gap-2">
                  <dt className="font-medium">Expiry:</dt>
                  <dd>
                    {paymentDetails.exp_month}/{paymentDetails.exp_year}
                  </dd>
                </div>
              )}

              {/* Funding */}
              {paymentDetails?.funding && (
                <div className="flex items-center gap-2">
                  <dt className="font-medium">Funding:</dt>
                  <dd className="capitalize">{paymentDetails.funding}</dd>
                </div>
              )}

              {/* Wallet (Apple Pay, Google Pay, etc.) */}
              {paymentDetails?.wallet && (
                <div className="flex items-center gap-2">
                  <dt className="font-medium">Wallet:</dt>
                  <dd>{paymentDetails.wallet}</dd>
                </div>
              )}

              {/* Stripe Payment ID (copyable) */}
              {order.stripePaymentId && (
                <div className="flex items-center gap-2">
                  <dt className="font-medium">Payment ID:</dt>
                  <dd className="flex items-center gap-1">
                    <span className="max-w-[180px] truncate">
                      {order.stripePaymentId}
                    </span>

                    <CopyButton text={order.stripePaymentId!} />
                  </dd>
                </div>
              )}
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
