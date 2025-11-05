'use client';

import { Pie, PieChart } from 'recharts';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

interface RatingDistributionChartProps {
  data: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

const chartConfig = {
  value: { label: 'Ratings' },
  five: { label: '5 Stars', color: '#10B981' },
  four: { label: '4 Stars', color: '#84CC16' },
  three: { label: '3 Stars', color: '#F59E0B' },
  two: { label: '2 Stars', color: '#F97316' },
  one: { label: '1 Star', color: '#EF4444' },
} satisfies ChartConfig;

export function RatingDistributionChart({
  data,
}: RatingDistributionChartProps) {
  const chartData = [
    { id: 'five', value: data[5], fill: chartConfig.five.color },
    { id: 'four', value: data[4], fill: chartConfig.four.color },
    { id: 'three', value: data[3], fill: chartConfig.three.color },
    { id: 'two', value: data[2], fill: chartConfig.two.color },
    { id: 'one', value: data[1], fill: chartConfig.one.color },
  ].filter((item) => item.value > 0);

  if (chartData.length === 0) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-500">
        No rating data available
      </div>
    );
  }

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Rating Distribution</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[300px]"
        >
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="id"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
            />

            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />

            <ChartLegend
              content={<ChartLegendContent nameKey="id" />}
              className="-translate-y-2 flex-wrap gap-2 text-sm *:basis-1/4 *:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
