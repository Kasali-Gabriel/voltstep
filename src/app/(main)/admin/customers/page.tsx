import { getCustomers } from '@/actions/admin/customers/customerList';
import CustomersList from '@/components/Admin/Customers/CustomersList';

export default async function Page() {
  const result = await getCustomers({ pageIndex: 0, pageSize: 10 });

  return (
    <CustomersList
      initialCustomers={result.customers}
      totalCount={result.totalCount}
    />
  );
}
