import {
  DeleteObjectsCommand,
  ListObjectsV2Command,
  S3Client,
} from '@aws-sdk/client-s3';
import 'dotenv/config';

const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const BUCKET = 'voltstep';

async function clearBucket() {
  try {
    let ContinuationToken;

    do {
      const listResponse = await r2.send(
        new ListObjectsV2Command({
          Bucket: BUCKET,
          ContinuationToken,
        }),
      );

      if (listResponse.Contents && listResponse.Contents.length > 0) {
        const deleteParams = {
          Bucket: BUCKET,
          Delete: {
            Objects: listResponse.Contents.map((obj) => ({ Key: obj.Key })),
          },
        };

        await r2.send(new DeleteObjectsCommand(deleteParams));
        console.log(`🗑️ Deleted ${listResponse.Contents.length} objects...`);
      }

      ContinuationToken = listResponse.NextContinuationToken;
    } while (ContinuationToken);

    console.log('✅ Bucket cleared');
  } catch (err) {
    console.error('❌ Error clearing bucket:', err);
  }
}

clearBucket();
