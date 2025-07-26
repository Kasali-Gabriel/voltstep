import { updateAllProductPopularityScores } from '@/utils/Product/popularityScore';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  try {
    // Verify authorization for the cron job (optional but recommended)
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    console.log('🚀 Starting daily popularity score update...');
    const startTime = Date.now();

    await updateAllProductPopularityScores();

    const duration = Date.now() - startTime;
    const message = `✅ Successfully updated popularity scores for all products in ${duration}ms`;

    console.log(message);

    return NextResponse.json({
      success: true,
      message,
      duration,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('❌ Failed to update popularity scores:', error);

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to update popularity scores',
        details: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
