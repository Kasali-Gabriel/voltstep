'use client';

import { Reviews } from '@/components/Reviews/reviews';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import Loader from '@/components/ui/loader';
import { Review } from '@/types/review';
import axios from 'axios';
import { MessageSquare, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { RatingDistributionChart } from '../Charts/RatingDistributionChart';

interface RatingStats {
  average: number;
  total: number;
  distribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

const ReviewsTab = ({ productId }: { productId: string }) => {
  const [reviews, setReviews] = useState<Review[]>([]);

  const [ratingStats, setRatingStats] = useState<RatingStats>({
    average: 0,
    total: 0,
    distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get(
          `/api/admin/inventory/products/${productId}/reviews`,
        );
        setReviews(data.reviews);
        setRatingStats(data.stats);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        size={16}
        className={`${
          index < rating ? 'fill-current text-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="mt-14 h-full w-full justify-items-center">
        <Loader size={44} borderWidth="2px" color="black" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Product Reviews</h2>

        <Badge variant="outline" className="flex items-center space-x-1">
          <MessageSquare size={16} />

          <span>{ratingStats.total} Reviews</span>
        </Badge>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Rating Summary</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold">
                {ratingStats.average.toFixed(1)}
              </div>

              <div className="mt-1 flex items-center justify-center space-x-1">
                {renderStars(Math.round(ratingStats.average))}
              </div>

              <div className="mt-1 text-sm text-gray-500">
                Based on {ratingStats.total} reviews
              </div>
            </div>

            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count =
                  ratingStats.distribution[
                    rating as keyof typeof ratingStats.distribution
                  ];
                const percentage =
                  ratingStats.total > 0 ? (count / ratingStats.total) * 100 : 0;

                return (
                  <div key={rating} className="flex items-center space-x-3">
                    <span className="w-3 text-sm">{rating}</span>

                    <Star size={14} className="fill-current text-yellow-400" />

                    <div className="h-2 flex-1 rounded-full bg-gray-200">
                      <div
                        className="h-2 rounded-full bg-yellow-400"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <span className="w-8 text-sm text-gray-500">{count}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <RatingDistributionChart data={ratingStats.distribution} />
      </div>

      <div className="flex flex-col space-y-2 pt-5">
        <Label>All Reviews</Label>

        <Reviews reviews={reviews} />
      </div>
    </div>
  );
};

export default ReviewsTab;
