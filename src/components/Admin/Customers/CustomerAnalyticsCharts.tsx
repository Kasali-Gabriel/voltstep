'use client';

import { ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { CustomerAnalyticsChartsProps } from '@/types/admin';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartCard } from '../Cards';

const CustomerAnalyticsCharts = ({
  newCustomersData,
  orderFrequencyData,
  topSpendersData,
}: CustomerAnalyticsChartsProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* New Customers Over Time */}
      <ChartCard title="New Customers Over Time">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={newCustomersData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

            <XAxis dataKey="month" stroke="#888" />

            <YAxis stroke="#888" />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Line
              type="monotone"
              dataKey="customers"
              stroke="#4f46e5"
              strokeWidth={2}
              dot={{ r: 4, fill: '#4f46e5' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Order Frequency Distribution (Histogram) */}
      <ChartCard title="Order Frequency Distribution">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={orderFrequencyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

            <XAxis dataKey="range" stroke="#888" />

            <YAxis stroke="#888" />

            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Bar dataKey="customers" fill="#10b981" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Top Spenders (Horizontal Bar) */}
      <ChartCard title="Top 10 Spenders" fullWidth>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={[...topSpendersData].sort(
              (a, b) => b.totalSpent - a.totalSpent,
            )}
            layout="vertical"
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

            <XAxis type="number" stroke="#888" />

            <YAxis dataKey="name" type="category" width={120} stroke="#888" />

            <ChartTooltip
              formatter={(v) => [`$${Number(v).toFixed(2)}`, ' Total Spent']}
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />

            <Bar dataKey="totalSpent" fill="#3b82f6" radius={[0, 6, 6, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  );
};

export default CustomerAnalyticsCharts;
