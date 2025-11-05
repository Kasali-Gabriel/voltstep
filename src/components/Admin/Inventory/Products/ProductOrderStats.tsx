'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag } from 'lucide-react';

interface ProductOrderStatsProps {
  stats: {
    totalOrders: number;
    totalQuantity: number;
    totalRevenue: number;
  };
}

const ProductOrderStats = ({ stats }: ProductOrderStatsProps) => {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Product Orders</h2>

        <Badge variant="outline" className="flex items-center space-x-1">
          <ShoppingBag size={16} />

          <span>{stats.totalOrders} Orders</span>
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Orders
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Quantity Sold
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">{stats.totalQuantity}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Total Revenue
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">
              {formatCurrency(stats.totalRevenue)}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ProductOrderStats;
