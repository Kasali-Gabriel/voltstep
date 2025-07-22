import { NextRequest, NextResponse } from 'next/server';
import {
  updateProductPopularityScore,
  updateAllProductPopularityScores,
  updateStaleProductPopularityScores,
  DEFAULT_WEIGHTS,
} from '@/utils/popularityScore';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, productId, weights, hoursThreshold } = body;

    switch (action) {
      case 'updateProduct':
        if (!productId) {
          return NextResponse.json(
            { error: 'Product ID is required' },
            { status: 400 }
          );
        }
        const score = await updateProductPopularityScore(
          productId,
          weights || DEFAULT_WEIGHTS
        );
        return NextResponse.json({ success: true, score });

      case 'updateAll':
        await updateAllProductPopularityScores(weights || DEFAULT_WEIGHTS);
        return NextResponse.json({ success: true });

      case 'updateStale':
        await updateStaleProductPopularityScores(
          hoursThreshold || 24,
          weights || DEFAULT_WEIGHTS
        );
        return NextResponse.json({ success: true });

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('Error updating popularity scores:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Update stale popularity scores (products not updated in last 24 hours)
    await updateStaleProductPopularityScores(24);
    return NextResponse.json({ success: true, message: 'Stale scores updated' });
  } catch (error) {
    console.error('Error updating stale popularity scores:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
