'use client';

import { ChartTooltip } from '@/components/ui/chart';
import { CustomerReview } from '@/types/admin';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';
import { ChartCard } from '../Cards';

const SentimentChart = ({ reviews }: { reviews: CustomerReview[] }) => {
  const getSentimentData = () => {
    const positive = reviews.filter((r) => r.rating >= 4).length;
    const neutral = reviews.filter((r) => r.rating === 3).length;
    const negative = reviews.filter((r) => r.rating <= 2).length;

    return [
      { name: 'Positive', value: positive, color: '#10b981' },
      { name: 'Neutral', value: neutral, color: '#f59e0b' },
      { name: 'Negative', value: negative, color: '#ef4444' },
    ].filter((item) => item.value > 0);
  };

  const sentimentData = getSentimentData();

  if (sentimentData.length === 0) {
    return null;
  }

  return (
    <ChartCard title="Sentiment Breakdown">
      <div>
        <div className="flex items-center justify-center">
          <ResponsiveContainer width={300} height={300}>
            <PieChart>
              <Pie
                data={sentimentData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                paddingAngle={5}
                dataKey="value"
              >
                {sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>

              <ChartTooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;

                    return (
                      <div className="rounded border bg-white p-2 shadow">
                        <p className="font-medium">{data.name}</p>

                        <p className="text-sm text-gray-600">
                          {data.value} reviews (
                          {((data.value / reviews.length) * 100).toFixed(1)}
                          %)
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

        <div className="mt-4 flex justify-center gap-4">
          {sentimentData.map((item) => (
            <div key={item.name} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: item.color }}
              />

              <span className="text-sm">
                {item.name}: {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </ChartCard>
  );
};

export default SentimentChart;
