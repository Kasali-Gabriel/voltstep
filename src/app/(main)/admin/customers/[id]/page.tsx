import {
  getCustomerActivity,
  getCustomerCategoryBreakdown,
  getCustomerDetail,
  getCustomerOrders,
  getCustomerReviews,
  getCustomerSpendingOverTime,
} from '@/actions/admin/customers/customerDetail';
import CustomerDetail from '@/components/Admin/Customers/CustomerDetail';
import {
  CategoryBreakdown,
  CustomerActivity,
  CustomerDetail as CustomerDetailType,
  CustomerOrder,
  CustomerReview,
  SpendingData,
} from '@/types/admin';

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const detail: CustomerDetailType = await getCustomerDetail(id);
  const reviews: CustomerReview[] = (await getCustomerReviews(id)).map(
    (review) => ({
      ...review,
      productName: review.productName === null ? undefined : review.productName,
      productSlug: review.productSlug === null ? undefined : review.productSlug,
    }),
  );
  const orders: CustomerOrder[] = await getCustomerOrders(id);
  const spending: SpendingData[] = await getCustomerSpendingOverTime(id);
  const categories: CategoryBreakdown[] =
    await getCustomerCategoryBreakdown(id);
  const activities: CustomerActivity[] = await getCustomerActivity(id);

  return (
    <CustomerDetail
      customer={detail}
      reviews={reviews}
      orders={orders}
      spendingData={spending}
      categoryData={categories}
      activities={activities}
    />
  );
}
