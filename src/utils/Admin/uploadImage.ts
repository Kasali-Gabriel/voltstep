import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import sharp from 'sharp';

const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
});

const BUCKET = 'voltstep';
const PUBLIC_URL = 'https://pub-b3a7fc47e6a0403f8ca6887c32b3ce9b.r2.dev';

export function getImageBuffer(img: string): Buffer | null {
  if (img.startsWith('data:')) {
    // Data URL: data:image/png;base64,iVBORw0KGgo...
    const parts = img.split(',');
    if (parts.length === 2) {
      try {
        return Buffer.from(parts[1], 'base64');
      } catch (err) {
        console.warn('Invalid base64 in data URL:', (err as Error).message);
        return null;
      }
    }
  } else if (!img.startsWith('http')) {
    // Assume plain base64
    try {
      return Buffer.from(img, 'base64');
    } catch (err) {
      console.warn('Invalid base64 string:', (err as Error).message);
      return null;
    }
  }
  return null; // If it's a URL, don't process
}

export async function uploadToR2(
  buffer: Buffer,
  key: string,
): Promise<string | null> {
  try {
    const processedBuffer = await sharp(buffer)
      .resize({
        width: 600,
        fit: 'inside',
        background: { r: 0, g: 0, b: 0, alpha: 0 },
      })
      .webp({ quality: 100 })
      .toBuffer();

    await r2.send(
      new PutObjectCommand({
        Bucket: BUCKET,
        Key: key,
        Body: processedBuffer,
        ContentType: 'image/webp',
        CacheControl: 'public, max-age=31536000', // 1 year cache
      }),
    );

    return `${PUBLIC_URL}/${key}`;
  } catch (err) {
    console.warn(`Failed to upload image:`, (err as Error).message);
    return null;
  }
}

export function generateUniqueImageKey(basePath: string): string {
  const timestamp = Date.now();
  const randomId = Math.random().toString(36).substring(2, 8);
  return `${basePath}/image-${timestamp}-${randomId}.webp`;
}

export async function deleteFromR2(key: string): Promise<boolean> {
  try {
    await r2.send(
      new DeleteObjectCommand({
        Bucket: BUCKET,
        Key: key,
      }),
    );
    return true;
  } catch (err) {
    console.warn(`Failed to delete image:`, (err as Error).message);
    return false;
  }
}

export function extractKeyFromUrl(url: string): string | null {
  if (!url || !url.startsWith(PUBLIC_URL)) {
    return null;
  }
  return url.replace(`${PUBLIC_URL}/`, '');
}
