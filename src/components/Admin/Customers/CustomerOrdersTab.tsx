'use client';

import { DataTable } from '@/components/Tables/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartTooltip } from '@/components/ui/chart';
import { CategoryBreakdown, CustomerOrder, SpendingData } from '@/types/admin';
import { useRouter } from 'next/navigation';
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { columns } from './OrderColumns';

const CustomerOrdersTab = ({
  orders,
  spendingData,
  categoryData,
}: {
  orders: CustomerOrder[];
  spendingData: SpendingData[];
  categoryData: CategoryBreakdown[];
}) => {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  const router = useRouter();

  return (
    <div className="space-y-6">
      {/* Spending Over Time Chart */}
      {spendingData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Spending Over Time</CardTitle>
          </CardHeader>

          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={spendingData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

                <XAxis dataKey="month" stroke="#888" />

                <YAxis stroke="#888" />

                <ChartTooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="rounded border bg-white p-2 shadow">
                          <p className="font-medium">{label}</p>
                          <p className="text-sm text-gray-600">
                            Spent: ${Number(payload[0].value).toFixed(2)}
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                  cursor={false}
                />

                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#3b82f6' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}

      {/* Category Breakdown Pie Chart */}
      {categoryData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Category Breakdown</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width={400} height={300}>
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={120}
                    dataKey="amount"
                    label={({ name, percentage }) =>
                      `${name} (${percentage.toFixed(1)}%)`
                    }
                  >
                    {categoryData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>

                  <ChartTooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload;
                        return (
                          <div className="rounded border bg-white p-2 shadow">
                            <p className="font-medium">{data.category}</p>

                            <p className="text-sm text-gray-600">
                              ${data.amount.toFixed(2)} (
                              {data.percentage.toFixed(1)}%))
                            </p>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {categoryData.map((item, index) => (
                <div key={item.category} className="flex items-center gap-2">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: COLORS[index % COLORS.length] }}
                  />

                  <span className="text-sm">{item.category}</span>

                  <span className="ml-auto text-sm text-gray-600">
                    ${item.amount.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>

        <CardContent>
          {orders.length > 0 ? (
            <DataTable
              columns={columns}
              data={orders}
              rowProps={(row) => ({
                onClick: () => router.push(`/admin/orders/${row.original.id}`),
                className:
                  'cursor-pointer hover:bg-muted transition-colors duration-150',
              })}
            />
          ) : (
            <p className="py-8 text-center text-gray-500">
              Customer has no order yet
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerOrdersTab;
