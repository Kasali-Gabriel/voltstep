'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { formatDate } from '@/lib/utils';
import { ProductWithStats } from '@/types/product';
import { Eye, Heart, Images, Info, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import PopularityChart from '../Charts/PopularityChart';
import ProductImages from '../ImagesPreview';

const OverviewTab = ({ product }: { product: ProductWithStats }) => {
  const StatRow = ({
    icon,
    label,
    value,
  }: {
    icon: React.ReactNode;
    label: string;
    value: number | string;
  }) => (
    <div className="bg-muted/40 flex items-center justify-between rounded-lg px-3 py-2">
      <div className="text-muted-foreground flex items-center gap-2 text-sm font-medium">
        {icon}
        {label}
      </div>
      <span className="font-semibold">{value}</span>
    </div>
  );

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold tracking-tight">Product Overview</h2>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="text-muted-foreground h-5 w-5" />
                Product Information
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <Label className="text-muted-foreground text-sm font-medium">
                  Name
                </Label>

                <p className="text-lg font-semibold">{product.name}</p>
              </div>

              <div>
                <Label className="text-muted-foreground text-sm font-medium">
                  Description
                </Label>

                <p className="text-muted-foreground">{product.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <Label className="text-muted-foreground text-sm font-medium">
                    Price
                  </Label>

                  <p className="text-lg font-semibold">${product.price}</p>
                </div>

                <div>
                  <Label className="text-muted-foreground text-sm font-medium">
                    Stock
                  </Label>

                  <p className="text-lg font-semibold">{product.quantity}</p>
                </div>
              </div>

              <div>
                <Label className="text-muted-foreground text-sm font-medium">
                  Category Path
                </Label>

                <div className="mt-1 flex flex-wrap items-center gap-2 text-sm">
                  <Link
                    href={`/admin/inventory/catalogs/${product?.subcategory?.category?.catalog?.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    {product?.subcategory?.category?.catalog?.name}
                  </Link>

                  <span>/</span>

                  <Link
                    href={`/admin/inventory/catalogs/${product?.subcategory?.category?.catalog?.slug}/${product?.subcategory?.category?.slug}`}
                    className="text-blue-600 hover:underline"
                  >
                    {product?.subcategory?.category?.name}
                  </Link>

                  <span>/</span>

                  <Link
                    href={`/admin/inventory/products?subcategoryId=${product.subcategory?.id}`}
                    className="font-medium hover:underline"
                  >
                    {product.subcategory?.name}
                  </Link>
                </div>
              </div>

              {product.tags.length > 0 && (
                <div>
                  <Label className="text-muted-foreground text-sm font-medium">
                    Tags
                  </Label>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.tags.map((tag, index) => (
                      <Badge key={index} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-6 border-t pt-4">
                <div>
                  <Label className="text-muted-foreground text-sm font-medium">
                    Created
                  </Label>

                  <p className="text-sm">
                    {formatDate(product.createdAt, 'long')}
                  </p>
                </div>

                <div>
                  <Label className="text-muted-foreground text-sm font-medium">
                    Updated
                  </Label>

                  <p className="text-sm">
                    {formatDate(product.updatedAt, 'long')}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <PopularityChart data={product.stats.popularityHistory} />
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <StatRow
                icon={<Heart size={16} className="text-red-500" />}
                label="Wishlists"
                value={product.stats.wishlistCount}
              />

              <StatRow
                icon={<Eye size={16} className="text-blue-500" />}
                label="Views"
                value={product.stats.viewCount}
              />

              <StatRow
                icon={<TrendingUp size={16} className="text-green-500" />}
                label="Popularity Score"
                value={product.popularityScore}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Images className="text-muted-foreground h-5 w-5" />
                Product Images
              </CardTitle>
            </CardHeader>

            <CardContent>
              <ProductImages
                images={product.images}
                productName={product.name}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
