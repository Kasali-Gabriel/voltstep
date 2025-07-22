/**
 * Script to update popularity scores for all products
 * Can be run as a scheduled task or cron job
 *
 * Usage:
 * - npm run update-popularity
 * - node scripts/update-popularity.js
 * - As a scheduled task in your deployment platform
 */

import { updateAllProductPopularityScores } from '../src/utils/popularityScore';

async function updatePopularityScores() {
  try {
    console.log('🚀 Starting popularity score update...');
    console.log(`📅 Time: ${new Date().toISOString()}`);

    const startTime = Date.now();

    await updateAllProductPopularityScores();

    const duration = Date.now() - startTime;
    console.log(`✅ Popularity scores updated successfully in ${duration}ms`);
    console.log(`🏁 Completed at: ${new Date().toISOString()}`);

    process.exit(0);
  } catch (error) {
    console.error('❌ Failed to update popularity scores:', error);
    console.error(`🕒 Failed at: ${new Date().toISOString()}`);
    process.exit(1);
  }
}

// Handle graceful shutdown
process.on('SIGINT', () => {
  console.log('\n⚠️ Received SIGINT, gracefully shutting down...');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n⚠️ Received SIGTERM, gracefully shutting down...');
  process.exit(0);
});

// Run the update
updatePopularityScores();
