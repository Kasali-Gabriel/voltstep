import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { ActivityItem, CustomerActivity } from '@/types/admin';
import { format, startOfWeek, subWeeks } from 'date-fns';
import { Eye, Heart, Package, Search, Star } from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts';
import { ChartCard } from '../Cards';

const CustomerTimeline = ({
  activities,
}: {
  activities: CustomerActivity[];
}) => {
  // Process activities for chart
  const processChartData = () => {
    if (!Array.isArray(activities)) return [];
    const weeks: Array<{
      week: string;
      orders: number;
      reviews: number;
      wishlist: number;
      views: number;
      searches: number;
    }> = [];
    const now = new Date();

    for (let i = 11; i >= 0; i--) {
      const weekStart = startOfWeek(subWeeks(now, i));

      weeks.push({
        week: format(weekStart, 'MMM dd'),
        orders: 0,
        reviews: 0,
        wishlist: 0,
        views: 0,
        searches: 0,
      });
    }

    activities.forEach((activity) => {
      const weekIndex = Math.floor(
        (now.getTime() - activity.date.getTime()) / (7 * 24 * 60 * 60 * 1000),
      );

      if (weekIndex >= 0 && weekIndex < 12) {
        const weekData = weeks[11 - weekIndex];
        switch (activity.type) {
          case 'order':
            weekData.orders += 1;
            break;
          case 'review':
            weekData.reviews += 1;
            break;
          case 'wishlist':
            weekData.wishlist += 1;
            break;
          case 'view':
            weekData.views += 1;
            break;
          case 'search':
            weekData.searches += 1;
            break;
        }
      }
    });

    return weeks;
  };

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'order':
        return <Package size={16} className="text-blue-500" />;
      case 'review':
        return <Star size={16} className="fill-yellow-500 text-yellow-500" />;
      case 'wishlist':
        return <Heart size={16} className="fill-red-500 text-red-500" />;
      case 'view':
        return <Eye size={16} className="text-green-500" />;
      case 'search':
        return <Search size={16} className="text-purple-500" />;
      default:
        return null;
    }
  };

  const renderDescription = (description: ActivityItem['description']) => {
    return description.map((part, index) => {
      let className = '';
      if (part.bold && part.italic) {
        className = 'font-bold italic';
      } else if (part.bold) {
        className = 'font-bold';
      } else if (part.italic) {
        className = 'italic';
      }

      return (
        <span key={index} className={className}>
          {part.text}
        </span>
      );
    });
  };

  const chartData = processChartData();

  return (
    <div className="space-y-6">
      {/* Stacked Area Chart */}
      <ChartCard title="Activity Over Time">
        <ResponsiveContainer width="100%" height={200}>
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

            <XAxis dataKey="week" stroke="#888" fontSize={12} />

            <YAxis stroke="#888" fontSize={12} />

            <ChartTooltip content={<ChartTooltipContent />} cursor={false} />

            <Area
              type="monotone"
              dataKey="orders"
              stackId="1"
              stroke="#3b82f6"
              fill="#3b82f6"
              fillOpacity={0.6}
            />

            <Area
              type="monotone"
              dataKey="reviews"
              stackId="1"
              stroke="#f59e0b"
              fill="#f59e0b"
              fillOpacity={0.6}
            />

            <Area
              type="monotone"
              dataKey="wishlist"
              stackId="1"
              stroke="#ef4444"
              fill="#ef4444"
              fillOpacity={0.6}
            />

            <Area
              type="monotone"
              dataKey="views"
              stackId="1"
              stroke="#10b981"
              fill="#10b981"
              fillOpacity={0.6}
            />

            <Area
              type="monotone"
              dataKey="searches"
              stackId="1"
              stroke="#8b5cf6"
              fill="#8b5cf6"
              fillOpacity={0.6}
            />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
        </CardHeader>

        <CardContent className="pr-2 md:pr-2">
          <div className="scrollbar-thin max-h-60 space-y-3 overflow-y-auto pr-5">
            {activities.slice(0, 10).map((activity: CustomerActivity) => (
              <div
                key={activity.id}
                className="flex items-center gap-3 rounded-lg border bg-gray-50 p-3"
              >
                {getActivityIcon(activity.type)}

                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {renderDescription(activity.description)}
                  </p>

                  <p className="text-xs text-gray-500">
                    {format(activity.date, 'MMM dd, yyyy hh:mm a')}
                  </p>
                </div>

                {activity.value && (
                  <span className="text-sm font-medium">
                    {activity.type === 'order'
                      ? `$${activity.value}`
                      : activity.value}
                  </span>
                )}
              </div>
            ))}

            {activities.length === 0 && (
              <p className="py-4 text-center text-sm text-gray-500">
                No recent activities
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerTimeline;
