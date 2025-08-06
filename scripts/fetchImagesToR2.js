// scripts/fetchPexelsImages.js
import dotenv from 'dotenv';
dotenv.config();

import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const { PEXELS_API_KEY } = process.env;
const NUM_IMAGES = 200;

async function fetchImages(query) {
  const images = [];
  let page = 1;

  while (images.length < NUM_IMAGES) {
    const res = await axios.get('https://api.pexels.com/v1/search', {
      headers: { Authorization: PEXELS_API_KEY },
      params: {
        query,
        per_page: 80,
        page,
      },
    });

    if (res.data.photos.length === 0) break;
    images.push(...res.data.photos);
    page++;
  }

  return images.slice(0, NUM_IMAGES);
}

async function downloadAndResizePng(url, outputPath) {
  const res = await axios.get(url, { responseType: 'arraybuffer' });
  const buffer = Buffer.from(res.data);
  const resized = await sharp(buffer)
    .resize({ width: 600 })
    .png({ quality: 100 })
    .toBuffer();

  await fs.writeFile(outputPath, resized);
}

async function processSubcategory(query, catalog, category, subcategory) {
  try {
    const images = await fetchImages(query);
    const dir = path.join(
      process.cwd(),
      'public',
      'r2-ready',
      catalog,
      category,
      subcategory,
    );
    await fs.mkdir(dir, { recursive: true });

    for (let i = 0; i < images.length; i++) {
      const url = images[i].src.original;
      const filePath = path.join(dir, `${i + 1}.png`);
      await downloadAndResizePng(url, filePath);
      console.log(`✅ Saved: ${filePath}`);
    }

    console.log(`✔️ Completed ${catalog}/${category}/${subcategory}`);
  } catch (err) {
    console.error(`❌ Failed ${subcategory}:`, err.message);
  }
}

// Example usage:
processSubcategory('men t-shirts', 'men', 'tops', 't-shirts');
