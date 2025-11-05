import { getAllOrders } from '@/actions/admin/orders';
import OrderList from '@/components/Admin/Orders/OrderList';
import { Order } from '@/types/order';

export default async function Page() {
  const result = await getAllOrders({ page: 1, pageSize: 10 });

  if (result.error) {
    return <div>Error: {result.error}</div>;
  }

  return (
    <div className="flex w-full max-w-7xl flex-col">
      <OrderList
        orders={result.orders as Order[]}
        pagination={result.pagination!}
        initialStatus="all"
      />
    </div>
  );
}
