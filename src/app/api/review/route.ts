import {
  addReview,
  getReviewsByProductId,
  updateReview,
} from '@/actions/review';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const productId = searchParams.get('productId');
    if (!productId) {
      return NextResponse.json({ error: 'Missing productId' }, { status: 400 });
    }
    const reviews = await getReviewsByProductId(productId);
    return NextResponse.json(reviews, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch reviews', details: error },
      { status: 500 },
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const { reviewerId, productId, rating, title, details, verified } = body;

    if (!reviewerId || !productId || !rating || !title || !details) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    const review = await addReview({
      reviewerId,
      productId,
      rating,
      title,
      details,
      verified,
    });

    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to add review', details: error },
      { status: 500 },
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const body = await req.json();

    const { reviewId, rating, title, details, verified } = body;

    if (!reviewId) {
      return NextResponse.json({ error: 'Missing reviewId' }, { status: 400 });
    }

    const review = await updateReview({
      reviewId,
      rating,
      title,
      details,
      verified,
    });

    return NextResponse.json(review, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update review', details: error },
      { status: 500 },
    );
  }
}
