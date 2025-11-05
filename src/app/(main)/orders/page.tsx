import { getUserOrders } from '@/actions/order';
import { BagLottie } from '@/components/ui/lottie';
import OrdersList from '@/components/User/Orders/OrdersList';
import Link from 'next/link';

// This page uses `auth()` (via getUserOrders) which accesses request headers.
// Mark the page as force-dynamic so Next allows dynamic server usage.
export const dynamic = 'force-dynamic';

const OrdersPage = async () => {
  const { orders, error } = await getUserOrders();

  if (error) {
    // Handle error, perhaps redirect or show error
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Order History</h1>
        <div className="py-16 text-center">
          <p className="text-red-600">Error loading orders: {error}</p>
        </div>
      </div>
    );
  }

  if (!orders || orders.length === 0) {
    return (
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <h1 className="mb-8 text-3xl font-bold">Order History</h1>

        <div className="flex flex-col items-center justify-center">
          <BagLottie />

          <h2 className="mt-10 mb-2 text-xl font-semibold">No orders yet</h2>

          <p className="mb-6 text-gray-600">
            Start shopping to see your orders here
          </p>

          <div className="flex w-full flex-col items-center justify-center space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Link
              href="/products/men"
              className="w-52 cursor-pointer rounded-3xl bg-black py-2.5 text-center leading-tight font-medium text-white hover:bg-neutral-900"
            >
              SHOP MENS
            </Link>

            <Link
              href="/products/women"
              className="w-52 cursor-pointer rounded-3xl bg-gray-500 py-2.5 text-center leading-tight font-medium text-white hover:bg-gray-700"
            >
              SHOP WOMENS
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Order History</h1>

      <OrdersList orders={orders} />
    </div>
  );
};

export default OrdersPage;
