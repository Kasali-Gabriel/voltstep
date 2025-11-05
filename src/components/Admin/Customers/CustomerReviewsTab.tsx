'use client';

import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartTooltip } from '@/components/ui/chart';
import Loader from '@/components/ui/loader';
import { CustomerReview } from '@/types/admin';
import { format } from 'date-fns';
import { Star } from 'lucide-react';
import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

const CustomerReviewsTab = ({
  reviews,
  loading,
}: {
  reviews: CustomerReview[];
  loading: boolean;
}) => {
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

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
      : 0;

  const sentimentData = getSentimentData();

  if (loading) {
    return (
      <div className="mt-28 h-full w-full justify-items-center">
        <Loader size={52} borderWidth="2px" color="black" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Review Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">{reviews.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">
              Average Rating
            </CardTitle>
          </CardHeader>

          <CardContent>
            <div className="flex items-center gap-2">
              <div className="text-2xl font-bold">
                {averageRating.toFixed(1)}
              </div>

              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={`${
                      star <= Math.round(averageRating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Sentiment</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="text-2xl font-bold">
              {sentimentData.length > 0 ? sentimentData[0].name : 'No reviews'}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sentiment Donut Chart */}
      {sentimentData.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Sentiment Breakdown</CardTitle>
          </CardHeader>

          <CardContent>
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
          </CardContent>
        </Card>
      )}

      {/* Reviews List */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reviews</CardTitle>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <div key={review.id} className="border-b pb-4 last:border-b-0">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            size={14}
                            className={`${
                              star <= review.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>

                      <Badge variant="outline">{review.rating}/5</Badge>
                    </div>

                    <span className="text-sm text-gray-500">
                      {format(review.date, 'MMM dd, yyyy')}
                    </span>
                  </div>

                  <h4 className="mb-1 font-medium">{review.title}</h4>

                  <p className="mb-2 text-sm text-gray-600">{review.details}</p>

                  <p className="text-xs text-gray-500">
                    Product: {review.productName}
                  </p>
                </div>
              ))
            ) : (
              <p className="py-8 text-center text-gray-500">
                No reviews found for this customer.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CustomerReviewsTab;
