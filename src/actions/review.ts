import prisma from '@/lib/prismaDb';
import { AddReviewParams, UpdateReviewParams } from '@/types/review';

// Get all reviews for a product by productId
export async function getReviewsByProductId(productId: string) {
  return await prisma.review.findMany({
    where: { productId },
    include: { reviewer: true },
    orderBy: { date: 'desc' },
  });
}

// Add a new review
export async function addReview({
  reviewerId,
  productId,
  rating,
  title,
  details,
  verified = false,
}: AddReviewParams) {
  return await prisma.review.create({
    data: {
      reviewerId,
      productId,
      rating,
      title,
      details,
      date: new Date(),
      verified,
    },
  });
}

// Update an existing review
export async function updateReview({ reviewId, ...data }: UpdateReviewParams) {
  return await prisma.review.update({
    where: { id: reviewId },
    data: {
      ...data,
      date: new Date(),
    },
  });
}
