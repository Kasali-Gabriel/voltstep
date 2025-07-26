import {
  updateAllProductPopularityScores,
  updateProductPopularityScore,
} from '@/utils/Product/popularityScore';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, productId } = body;

    switch (action) {
      case 'updateProduct':
        if (!productId) {
          return NextResponse.json(
            { error: 'Product ID is required' },
            { status: 400 },
          );
        }
        const score = await updateProductPopularityScore(productId);
        return NextResponse.json({ success: true, score });

      case 'updateAll':
        await updateAllProductPopularityScores();
        return NextResponse.json({ success: true });

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Error updating popularity scores:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
