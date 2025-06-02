import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import axios from '@/lib/axios';
import { ReviewFormProps } from '@/types/review';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import RatingInput from './RatingInput';

const reviewSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Review Title must be at least 10 characters.' }),
  details: z
    .string()
    .min(10, { message: 'Review Description must be at least 50 characters.' }),
  rating: z.number().min(1, { message: 'Please provide a rating.' }).max(5),
});

const ReviewForm = ({
  reviewerId,
  productId,
  defaultTitle = '',
  defaultDetails = '',
  defaultRating = 0,
  reviewId,
  onSuccess,
}: ReviewFormProps) => {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof reviewSchema>>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      title: defaultTitle,
      details: defaultDetails,
      rating: defaultRating,
    },
  });

  async function onSubmit(values: z.infer<typeof reviewSchema>) {
    setLoading(true);

    try {
      if (reviewId) {
        // Update review
        await axios.put('/api/review', {
          reviewId,
          rating: values.rating,
          title: values.title,
          details: values.details,
        });
      } else {
        // Add new review
        await axios.post('/api/review', {
          reviewerId,
          productId,
          rating: values.rating,
          title: values.title,
          details: values.details,
        });
      }

      if (onSuccess) onSuccess();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 pt-2">
        <div className="flex w-full items-center justify-center">
          <FormField
            control={form.control}
            name="rating"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col items-center justify-center">
                <FormControl>
                  <RatingInput
                    value={field.value}
                    onChange={field.onChange}
                    size={28}
                    disabled={loading}
                    starClassName="md:size-[3rem] size-[2.5rem] mx-1"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-10 flex flex-col space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Review Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Give your review a headline"
                    {...field}
                    className="rounded-lg border-stone-300"
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="details"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Review Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us more about your experience."
                    rows={5}
                    {...field}
                    className="scrollbar-thin h-40 overflow-y-auto rounded-lg border-stone-300 p-4"
                    disabled={loading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="mt-10 flex w-full justify-end">
          <button
            type="submit"
            className="w-fit rounded-3xl bg-black px-10 py-2.5 text-sm text-white hover:bg-neutral-900 disabled:opacity-60"
            disabled={loading}
          >
            {reviewId ? 'Update Review' : 'Submit Review'}
          </button>
        </div>
      </form>
    </Form>
  );
};

export default ReviewForm;
