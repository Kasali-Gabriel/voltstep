import {
  getCustomerStats,
  getNewCustomersOverTime,
  getOrderFrequencyDistribution,
  getTopSpenders,
} from '@/actions/admin/customers/customerStats';
import { KpiCard } from '@/components/Admin/Cards';
import CustomerAnalyticsCharts from '@/components/Admin/Customers/CustomerAnalyticsCharts';
import {
  CustomerStats,
  NewCustomerData,
  OrderFrequencyData,
  TopSpenderData,
} from '@/types/admin';
import { UserPlus, Users } from 'lucide-react';

export default async function Page() {
  const stats: CustomerStats = await getCustomerStats();
  const newCustomers: NewCustomerData[] = await getNewCustomersOverTime();
  const orderFrequency: OrderFrequencyData[] =
    await getOrderFrequencyDistribution();
  const topSpenders: TopSpenderData[] = await getTopSpenders();

  return (
    <div className="space-y-8">
      {/* Header */}
      <h2 className="mb-5 text-2xl font-bold">Customers Insight</h2>

      {/* TODO KPI Strip (Horizontal Row or Compact Grid)
Total Customers
New Customers (filter period)
Active Customers
Returning Customers %
Avg Orders per Customer

New Customers Over Time (line chart)

Retention / Repeat Rate (donut or funnel)

Order Frequency Distribution (histogram)
 Top Spenders (list or bar chart)


🌍 Global Filter
Today / This Week / This Month / This Year (applies across all).
 */}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        <KpiCard
          title="Total Customers"
          value={stats?.totalCustomers || 0}
          icon={<Users className="h-4 w-4 text-gray-400" />}
          subtext="Registered users"
        />

        <KpiCard
          title="New Customers"
          value={stats?.newCustomersThisMonth || 0}
          change={stats?.newCustomersChange}
          icon={<UserPlus className="h-4 w-4 text-gray-400" />}
        />
      </div>

      {/* Analytics Section */}
      <CustomerAnalyticsCharts
        newCustomersData={newCustomers}
        orderFrequencyData={orderFrequency}
        topSpendersData={topSpenders}
      />
    </div>
  );
}
