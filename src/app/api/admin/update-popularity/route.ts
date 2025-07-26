import { updateAllProductPopularityScores } from '@/utils/Product/popularityScore';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('🚀 Starting popularity update (fire and forget)...');

    // Fire-and-forget pattern — run after response
    updateAllProductPopularityScores()
      .then(() => console.log('✅ Popularity scores updated'))
      .catch((err) =>
        console.error('❌ Error updating popularity scores:', err),
      );

    return NextResponse.json({
      success: true,
      message: 'Popularity score update started',
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ Route failed before async trigger:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to trigger popularity update',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
