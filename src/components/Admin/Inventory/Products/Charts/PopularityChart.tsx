'use client';

import { ChartCard } from '@/components/Admin/Cards';
import { ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

interface PopularityChartProps {
  data: Array<{ date: string; score: number }>;
}

const PopularityChart = ({ data }: PopularityChartProps) => {
  if (!data || data.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-500">
        No popularity data available
      </div>
    );
  }

  const formattedData = data.map((item) => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    }),
  }));

  return (
    <ChartCard fullWidth title="Popularity Trends">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={formattedData}>
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6B7280' }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12, fill: '#6B7280' }}
          />

          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

          <Line
            type="monotone"
            dataKey="score"
            stroke="#3B82F6"
            strokeWidth={2}
            dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: '#1D4ED8' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};

export default PopularityChart;
