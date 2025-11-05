import {
  DeleteObjectsCommand,
  ListObjectsV2Command,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const prisma = new PrismaClient();

// R2 client
const r2 = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const BUCKET = 'voltstep';
const BASE_DIR = 'C:/Users/hp/Pictures/Product Images';
const PUBLIC_URL = 'https://pub-b3a7fc47e6a0403f8ca6887c32b3ce9b.r2.dev';

// --- helpers ---
function safeName(str) {
  return str
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-_]/g, '');
}

function shuffle(array) {
  return [...array].sort(() => 0.5 - Math.random());
}

function* imageBatchGenerator(images, batchSize = 8) {
  let pool = [...images];
  while (true) {
    if (pool.length < batchSize) pool = shuffle(images);
    yield pool.splice(0, batchSize);
  }
}

// --- upload function ---
async function uploadToR2(filePath, key) {
  try {
    const buffer = await sharp(filePath)
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
        Body: buffer,
        ContentType: 'image/webp',
      }),
    );

    return `${PUBLIC_URL}/${key}`;
  } catch (err) {
    console.warn(`⚠️ Failed to process ${filePath}:`, err.message);
    return null; // skip failed image
  }
}

// --- clear DB images ---
async function clearAllProductImages() {
  await prisma.product.updateMany({ data: { images: [] } });
  console.log('🧹 Cleared all product images in DB');
}

// --- clear R2 bucket ---
async function clearR2Bucket() {
  const listed = await r2.send(new ListObjectsV2Command({ Bucket: BUCKET }));
  if (listed.Contents?.length > 0) {
    const objects = listed.Contents.map((obj) => ({ Key: obj.Key }));
    await r2.send(
      new DeleteObjectsCommand({
        Bucket: BUCKET,
        Delete: { Objects: objects },
      }),
    );
    console.log('🧹 Cleared R2 bucket');
  }
}

// --- main upload script ---
async function main() {
  await clearAllProductImages();
  await clearR2Bucket();

  const catalogs = fs.readdirSync(BASE_DIR);

  for (const catalog of catalogs) {
    const categories = fs.readdirSync(path.join(BASE_DIR, catalog));

    for (const category of categories) {
      const subcategories = fs.readdirSync(
        path.join(BASE_DIR, catalog, category),
      );

      for (const subcategory of subcategories) {
        const subcatDir = path.join(BASE_DIR, catalog, category, subcategory);
        const images = fs
          .readdirSync(subcatDir)
          .filter((f) => /\.(jpe?g|png|webp)$/i.test(f))
          .map((img) => path.join(subcatDir, img));

        if (images.length < 8) {
          console.warn(
            `⚠️ Subcategory ${subcategory} in ${category}/${catalog} has fewer than 8 images`,
          );
          continue;
        }

        const batcher = imageBatchGenerator(images);

        // fetch products using catalog → category → subcategory
        const products = await prisma.product.findMany({
          where: {
            subcategory: {
              name: subcategory,
              category: { name: category, catalog: { name: catalog } },
            },
          },
        });

        for (const product of products) {
          const selected = batcher.next().value;
          const urls = [];

          for (const imgPath of selected) {
            const fileName =
              path.basename(imgPath, path.extname(imgPath)) + '.webp';
            const key = `${safeName(catalog)}/${safeName(category)}/${safeName(subcategory)}/${safeName(product.slug || product.id)}/${fileName}`;
            const url = await uploadToR2(imgPath, key);
            if (url) urls.push(url);
          }

          if (urls.length > 0) {
            await prisma.product.update({
              where: { id: product.id },
              data: { images: urls },
            });
            console.log(
              `✅ Assigned ${urls.length} images to ${product.slug || product.id}`,
            );
          } else {
            console.warn(
              `⚠️ No images assigned to ${product.slug || product.id}`,
            );
          }
        }
      }
    }
  }
}

main()
  .catch((err) => console.error('❌ Error:', err))
  .finally(() => prisma.$disconnect());
