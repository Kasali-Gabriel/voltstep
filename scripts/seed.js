import { PrismaClient } from '../src/generated/prisma/index.js';

const prisma = new PrismaClient();

// Review title options
const goodTitles = [
  'Fantastic product! Worth every penny.',
  'Exceeded my expectations. I will definitely buy again.',
  'Perfect! Exactly what I was looking for.',
  'Highly recommend. Top-notch quality and comfort.',
  'I am so happy with this purchase. Great quality.',
];

const neutralTitles = [
  'The product is decent, but could use some improvements.',
  'Good, but not as expected. It serves the purpose.',
  "It's okay, but I have seen better.",
  'Not bad, but the price feels a bit high.',
  "It's fine, but I hoped for better features.",
];

const badTitles = [
  "Very disappointing. Didn't meet my expectations.",
  'Poor quality. Not worth the money.',
  'I regret buying this. Misleading product.',
  'Broke after one use. Very upset.',
  'Horrible experience — looks nothing like the photos.',
];

// Review detail pools
const goodDetails = [
  'The product exceeded all my expectations in every way.',
  'It was delivered on time and looked exactly as shown.',
  'The materials used feel premium and well-crafted.',
  'Customer support was friendly and helpful throughout.',
  'I’ve been using it daily and it performs perfectly.',
  'It’s surprisingly durable and built to last.',
  'I’ve already recommended it to friends and family.',
  'The design is sleek, modern, and user-friendly.',
  'You can tell a lot of thought went into this.',
  'One of the best purchases I’ve made this year.',
  'Everything was packaged safely and arrived in perfect condition.',
  'The instructions were clear and setup was easy.',
  'It looks even better in real life than in pictures.',
  'I’d happily order again from this seller.',
  'No flaws or issues — just a great experience.',
];

const neutralDetails = [
  'The item works, but has a few drawbacks worth noting.',
  'It arrived on time, but packaging could be better.',
  'It matches the description but lacks some polish.',
  'Customer support was okay but slow to respond.',
  'There are better alternatives, but this one gets the job done.',
  'It’s functional, just not exciting or outstanding.',
  'Not bad overall, but not a standout product.',
  'It does what it’s supposed to, but that’s it.',
  'Quality is average — neither impressive nor terrible.',
  'You might want to wait for a discount before buying.',
  'Design is basic and could use some flair.',
  'Some instructions were unclear and caused confusion.',
  'Color was slightly off from the listing.',
  'Would be great with a few simple upgrades.',
  'I have mixed feelings about recommending it.',
];

const badDetails = [
  'The product failed within days of use.',
  'I received a completely different item than ordered.',
  'Packaging was terrible and the item was damaged.',
  'Customer support ignored my complaint.',
  'It’s cheaply made and looks nothing like advertised.',
  'I would never purchase from this seller again.',
  'It broke before I even finished assembling it.',
  'There’s no way this is worth the asking price.',
  'It felt used or previously opened.',
  'Very poor experience from start to finish.',
  'Instructions were missing or impossible to follow.',
  'Material feels flimsy and unsafe.',
  'The color and size were way off.',
  'Even after replacement, the issues remained.',
  'I tried returning it but got no refund.',
];

// Select title and details based on rating
function getTitle(rating) {
  if (rating >= 4)
    return goodTitles[Math.floor(Math.random() * goodTitles.length)];
  if (rating === 3)
    return neutralTitles[Math.floor(Math.random() * neutralTitles.length)];
  return badTitles[Math.floor(Math.random() * badTitles.length)];
}

function getDetails(rating) {
  const pool =
    rating >= 4 ? goodDetails : rating === 3 ? neutralDetails : badDetails;
  const count = 5 + Math.floor(Math.random() * 6); // Select 5–10 sentences
  return [...pool]
    .sort(() => 0.5 - Math.random())
    .slice(0, count)
    .join(' ');
}

// Ensure review date is after user creation AND product creation
function getRandomDateAfter(userCreatedAt, productCreatedAt) {
  const start = new Date(
    Math.max(userCreatedAt.getTime(), productCreatedAt.getTime()),
  );
  const end = new Date();
  const startTime = start.getTime();
  const endTime = end.getTime();
  const randomTime = startTime + Math.random() * (endTime - startTime);
  return new Date(randomTime);
}

// Generate random date between min date and max date
function getRandomDateBetween(minDate, maxDate) {
  const minTime = minDate.getTime();
  const maxTime = maxDate.getTime();
  const randomTime = minTime + Math.random() * (maxTime - minTime);
  return new Date(randomTime);
}

// Update all users with random createdAt dates starting from May 25, 2023
async function updateUserDates() {
  const minDate = new Date('2023-05-25');
  const maxDate = new Date();

  const users = await prisma.user.findMany({ select: { id: true } });

  console.log(
    `📅 Updating ${users.length} users with random createdAt dates...`,
  );

  // Process sequentially with smaller batches to avoid timeout
  const batchSize = 10;
  for (let i = 0; i < users.length; i += batchSize) {
    const batch = users.slice(i, i + batchSize);

    for (const user of batch) {
      try {
        const randomCreatedAt = getRandomDateBetween(minDate, maxDate);
        await prisma.user.update({
          where: { id: user.id },
          data: {
            createdAt: randomCreatedAt,
            updatedAt: randomCreatedAt,
          },
        });
      } catch (error) {
        console.log(`⚠️  Failed to update user ${user.id}:`, error.message);
      }
    }

    console.log(
      `📅 Processed batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(users.length / batchSize)}`,
    );

    // Add a small delay between batches
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  console.log('✅ User dates updated successfully.');
}

// Update all products with random createdAt dates starting from May 25, 2023
async function updateProductDates() {
  const minDate = new Date('2023-05-25');
  const maxDate = new Date();

  const products = await prisma.product.findMany({ select: { id: true } });

  console.log(
    `📅 Updating ${products.length} products with random createdAt dates...`,
  );

  // Process sequentially with smaller batches to avoid timeout
  const batchSize = 10;
  for (let i = 0; i < products.length; i += batchSize) {
    const batch = products.slice(i, i + batchSize);

    for (const product of batch) {
      try {
        const randomCreatedAt = getRandomDateBetween(minDate, maxDate);
        await prisma.product.update({
          where: { id: product.id },
          data: {
            createdAt: randomCreatedAt,
            updatedAt: randomCreatedAt,
          },
        });
      } catch (error) {
        console.log(
          `⚠️  Failed to update product ${product.id}:`,
          error.message,
        );
      }
    }

    console.log(
      `📅 Processed batch ${Math.floor(i / batchSize) + 1}/${Math.ceil(products.length / batchSize)}`,
    );

    // Add a small delay between batches
    await new Promise((resolve) => setTimeout(resolve, 100));
  }

  console.log('✅ Product dates updated successfully.');
}

// Random rating by type
function getRandomRating(type) {
  if (type === 'good') return Math.floor(Math.random() * 2) + 4; // 4–5
  if (type === 'ok') return Math.floor(Math.random() * 2) + 2; // 2–3
  return Math.floor(Math.random() * 2) + 1; // 1–2
}

async function generateReviews() {
  const products = await prisma.product.findMany({
    select: { id: true, createdAt: true },
  });
  const users = await prisma.user.findMany({
    select: { id: true, createdAt: true },
  });

  const shuffledProducts = [...products].sort(() => 0.5 - Math.random());
  const total = products.length;

  const goodCount = Math.floor(total * 0.7);
  const neutralCount = Math.floor(total * 0.2);

  const groupings = [
    ...shuffledProducts
      .slice(0, goodCount)
      .map((p) => ({ ...p, ratingType: 'good' })),
    ...shuffledProducts
      .slice(goodCount, goodCount + neutralCount)
      .map((p) => ({ ...p, ratingType: 'ok' })),
    ...shuffledProducts
      .slice(goodCount + neutralCount)
      .map((p) => ({ ...p, ratingType: 'bad' })),
  ];

  const sentimentMap = {
    good: ['good', 'ok', 'bad'],
    ok: ['ok', 'good', 'bad'],
    bad: ['bad', 'ok', 'good'],
  };

  for (const {
    id: productId,
    createdAt: productCreatedAt,
    ratingType,
  } of groupings) {
    await prisma.review.deleteMany({ where: { productId } });

    const totalReviews = Math.floor(Math.random() * 16) + 5; // 5–20 reviews
    const primaryCount = Math.floor(totalReviews * 0.8);

    // Filter users who can review this product (created after product creation)
    const eligibleUsers = users.filter(
      (user) => user.createdAt >= productCreatedAt,
    );

    if (eligibleUsers.length === 0) {
      console.log(
        `⚠️  No eligible users for product ${productId} (created ${productCreatedAt})`,
      );
      continue;
    }

    const shuffledUsers = [...eligibleUsers].sort(() => 0.5 - Math.random());
    const selectedUsers = shuffledUsers.slice(
      0,
      Math.min(totalReviews, eligibleUsers.length),
    );

    const reviews = selectedUsers.map((user, i) => {
      const type =
        i < primaryCount
          ? ratingType
          : sentimentMap[ratingType][Math.floor(Math.random() * 2) + 1]; // Random from other 2 sentiments

      const rating = getRandomRating(type);
      return {
        rating,
        title: getTitle(rating),
        details: getDetails(rating),
        date: getRandomDateAfter(user.createdAt, productCreatedAt),
        productId,
        reviewerId: user.id,
      };
    });

    await prisma.review.createMany({ data: reviews });
    console.log(
      `📝 Added ${reviews.length} reviews (${ratingType}) to product ${productId}`,
    );
  }

  console.log('✅ Review generation complete.');
}

async function main() {
  try {
    console.log('🚀 Starting seed script...');

    // Step 1: Update user dates
    await updateUserDates();

    // Step 2: Update product dates
    await updateProductDates();

    // Step 3: Generate reviews with proper date constraints
    await generateReviews();

    console.log('✅ All seeding operations completed successfully!');
  } catch (error) {
    console.error('❌ Error during seeding:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
