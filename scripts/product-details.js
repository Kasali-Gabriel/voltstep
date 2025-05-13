import fs from 'fs';

var sizeMap = {
  // MEN subcategories
  Tops: ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
  'T-Shirts': ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
  'Tank Tops': ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
  'Long Sleeve Shirts': ['XS', 'S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
  'Compression Tops': ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  Shorts: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  Joggers: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  'Tights / Leggings': ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  Sweatpants: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  Jackets: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  Windbreakers: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  'Running Shoes': [
    '7',
    '7.5',
    '8',
    '8.5',
    '9',
    '9.5',
    '10',
    '10.5',
    '11',
    '11.5',
    '12',
    '12.5',
    '13',
    '14',
    '15',
  ],
  'Training Shoes': [
    '7',
    '7.5',
    '8',
    '8.5',
    '9',
    '9.5',
    '10',
    '10.5',
    '11',
    '11.5',
    '12',
    '12.5',
    '13',
    '14',
    '15',
  ],
  'Casual Sneakers': [
    '7',
    '7.5',
    '8',
    '8.5',
    '9',
    '9.5',
    '10',
    '10.5',
    '11',
    '11.5',
    '12',
    '12.5',
    '13',
  ],
  Socks: ['S/M', 'L/XL'],
  Gloves: ['S', 'M', 'L', 'XL'],
  // WOMEN subcategories
  'Sports Bras': ['XS', 'S', 'M', 'L', 'XL', '32', '34', '36', '38', '40'],
  'Crop Tops': ['XS', 'S', 'M', 'L', 'XL'],
  'Tanks & Tees': ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  Leggings: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  Hoodies: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  Sweatshirts: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  'Lifestyle Sneakers': [
    '5',
    '5.5',
    '6',
    '6.5',
    '7',
    '7.5',
    '8',
    '8.5',
    '9',
    '9.5',
    '10',
    '10.5',
    '11',
    '11.5',
    '12',
  ],
  'Matching Sets': ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  'Maternity Activewear': ['S', 'M', 'L', 'XL', 'XXL'],
  // KIDS subcategories
  'Activewear Sets': ['2T', '3T', '4T', '5T', 'XS', 'S', 'M', 'L', 'XL'],
  'Sports-Specific Apparel': ['XS', 'S', 'M', 'L', 'XL'],
  'Athleisure / Lifestyle Gymwear': ['XS', 'S', 'M', 'L', 'XL'],
  'Swimwear & Rash Guards': ['2T', '3T', '4T', '5T', 'XS', 'S', 'M', 'L', 'XL'],
  'Outerwear & Layering Essentials': ['XS', 'S', 'M', 'L', 'XL'],
  'All-Terrain Trainers': ['5', '6', '7', '8', '9', '10', '11', '12'],
  'ProCourt Kicks': ['5', '6', '7', '8', '9', '10', '11', '12'],
  'EasyGo Sneakers': ['5', '6', '7', '8', '9', '10', '11', '12'],
  'CloudStep Slides': ['5', '6', '7', '8', '9', '10', '11', '12'],
  'Socks & Compression Wear': ['S/M', 'L/XL'],
  'Gloves & Protective Gear': ['S', 'M', 'L', 'XL'],
};
var mensClothingColors = {
  Black: '#000000',
  White: '#FFFFFF',
  Grey: '#808080',
  Navy: '#000080',
  Blue: '#0000FF',
  Red: '#FF0000',
  Olive: '#808000',
  Charcoal: '#36454F',
  Tan: '#D2B48C',
  Beige: '#F5F5DC',
  Maroon: '#800000',
  'Dark Grey': '#A9A9A9',
  Burgundy: '#800020',
  Slate: '#708090',
  Silver: '#C0C0C0',
  Brown: '#A52A2A',
  'Cobalt Blue': '#0047AB',
};
var womensClothingColors = {
  Red: '#FF0000',
  Blue: '#0000FF',
  Black: '#000000',
  White: '#FFFFFF',
  Grey: '#808080',
  Yellow: '#FFFF00',
  Pink: '#FFC0CB',
  Purple: '#800080',
  Maroon: '#800000',
  Navy: '#000080',
  Teal: '#008080',
  Olive: '#808000',
  Beige: '#F5F5DC',
  Peach: '#FFE5B4',
  Tan: '#D2B48C',
  Silver: '#C0C0C0',
  'Sky Blue': '#87CEEB',
  Coral: '#FF7F50',
  Indigo: '#4B0082',
  Lavender: '#E6E6FA',
  Crimson: '#DC143C',
  Khaki: '#F0E68C',
  Magenta: '#FF00FF',
  Mint: '#98FF98',
  Plum: '#DDA0DD',
  Rose: '#FF007F',
  Amber: '#FFBF00',
  Ivory: '#FFFFF0',
  Lemon: '#FFF700',
  Lilac: '#C8A2C8',
  Mustard: '#FFDB58',
  Periwinkle: '#CCCCFF',
  Ruby: '#E0115F',
  Sapphire: '#0F52BA',
  Scarlet: '#FF2400',
  'Sea Green': '#2E8B57',
  'Slate Blue': '#6A5ACD',
  'Steel Blue': '#4682B4',
  Firebrick: '#B22222',
  'Forest Green': '#228B22',
  'Hot Pink': '#FF69B4',
  'Light Blue': '#ADD8E6',
  'Light Coral': '#F08080',
  'Light Gray': '#D3D3D3',
  'Light Green': '#90EE90',
  'Light Pink': '#FFB6C1',
  'Light Salmon': '#FFA07A',
  'Light Sea Green': '#20B2AA',
  'Light Sky Blue': '#87CEFA',
  'Light Yellow': '#FFFFE0',
  'Lime Green': '#32CD32',
};
var footwearColors = {
  Black: '#000000',
  White: '#FFFFFF',
  Grey: '#808080',
  Brown: '#A52A2A',
  Beige: '#F5F5DC',
  Tan: '#D2B48C',
  Navy: '#000080',
  Burgundy: '#800020',
  Red: '#FF0000',
  Blue: '#0000FF',
  Silver: '#C0C0C0',
  Gold: '#FFD700',
  Charcoal: '#36454F',
  Olive: '#808000',
  'Dark Brown': '#5C4033',
  'Dark Grey': '#A9A9A9',
  Maroon: '#800000',
  'Cobalt Blue': '#0047AB',
  Slate: '#708090',
};
var generateRandomReviewer = function () {
  var reviewerNames = [
    'Alice',
    'Bob',
    'Charlie',
    'David',
    'Eve',
    'Frank',
    'Grace',
    'Hannah',
    'Isaac',
    'Jack',
    'Katherine',
    'Liam',
    'Mia',
    'Noah',
    'Olivia',
    'Peter',
    'Quincy',
    'Rachel',
    'Sam',
    'Tina',
    'Ursula',
    'Victor',
    'Wendy',
    'Xander',
    'Yara',
    'Zane',
    'Aaron',
    'Bea',
    'Cameron',
    'Diana',
    'Ethan',
    'Fiona',
    'Gavin',
    'Helen',
    'Ivy',
    'James',
    'Kim',
    'Leo',
    'Maya',
    'Nathan',
    'Oscar',
    'Paul',
    'Quinn',
    'Riley',
    'Sophia',
    'Travis',
    'Uma',
    'Vera',
    'Will',
    'Xena',
    'Yvonne',
    'Zoe',
  ];
  return reviewerNames[Math.floor(Math.random() * reviewerNames.length)];
};
var generateRandomReview = function (rating) {
  var goodReviews = [
    'Fantastic product! Worth every penny.',
    'I am so happy with this purchase. Great quality.',
    'Exceeded my expectations. I will definitely buy again.',
    'Perfect! Exactly what I was looking for.',
    'Highly recommend. Top-notch quality and comfort.',
  ];
  var neutralReviews = [
    'The product is decent, but could use some improvements.',
    'Good, but not as expected. It serves the purpose.',
    "It's okay, but I have seen better.",
    'Not bad, but I think the price is a bit high for the quality.',
    "It's fine, but I would expect better features for the price.",
  ];
  var badReviews = [
    "Very disappointing. Didn't meet my expectations at all.",
    'Poor quality. Not worth the money.',
    "I regret buying this. It's not even close to what was advertised.",
    'The product broke after one use. Totally useless.',
    "Horrible experience, the color was totally different, and it didn't fit at all.",
  ];
  var review;
  if (rating === 5) {
    review = goodReviews[Math.floor(Math.random() * goodReviews.length)];
  } else if (rating >= 3) {
    review = neutralReviews[Math.floor(Math.random() * neutralReviews.length)];
  } else {
    review = badReviews[Math.floor(Math.random() * badReviews.length)];
  }
  return review;
};
var getColorSet = function (category, subcategory) {
  if (/shoes|sneakers|slides/i.test(subcategory)) return footwearColors;
  if (category === 'Men') return mensClothingColors;
  if (category === 'Women') return womensClothingColors;
  return mensClothingColors; // default fallback
};
var getSizes = function (subcategory) {
  return sizeMap[subcategory] || [];
};
var generateReviews = function () {
  var numberOfReviews = Math.floor(Math.random() * 15) + 1; // 1 to 15 reviews
  return Array.from({ length: numberOfReviews }).map(function () {
    var rating = Math.floor(Math.random() * 5) + 1;
    return {
      reviewer: generateRandomReviewer(),
      rating: rating,
      comment: generateRandomReview(rating),
      date: new Date().toISOString(),
    };
  });
};
var updateProductsData = function () {
  var filePath = './public/products.json';
  console.log('Reading file:', filePath);
  var data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  console.log(
    'Initial data loaded:',
    JSON.stringify(data, null, 2).slice(0, 500),
  ); // Log first 500 characters

  for (var _i = 0, data_1 = data.Products_data; _i < data_1.length; _i++) {
    var entry = data_1[_i];
    console.log('Processing entry:', entry);
    for (var _a = 0, _b = entry.categories; _a < _b.length; _a++) {
      var category = _b[_a];
      console.log('Processing category:', category.name);
      for (var _c = 0, _d = category.subcategories; _c < _d.length; _c++) {
        var subcat = _d[_c];
        console.log('Processing subcategory:', subcat.name);
        for (var _e = 0, _f = subcat.products; _e < _f.length; _e++) {
          var product = _f[_e];
          console.log('Processing product:', product.name);
          // Sizes
          if (!product.sizes || product.sizes.length === 0) {
            product.sizes = getSizes(subcat.name);
            console.log(
              'Updated sizes for product:',
              product.name,
              product.sizes,
            );
          }
          // Colors
          if (!product.colors || product.colors.length === 0) {
            var colorSet = getColorSet(category.name, subcat.name);
            var colorKeys = Object.keys(colorSet);
            var count = Math.floor(Math.random() * 10) + 1; // 1–10 colors
            var shuffled = colorKeys.sort(function () {
              return 0.5 - Math.random();
            });
            product.colors = shuffled.slice(0, count);
            console.log(
              'Updated colors for product:',
              product.name,
              product.colors,
            );
          }
          // Reviews
          if (!product.reviews || product.reviews.length === 0) {
            product.reviews = generateReviews();
            console.log(
              'Updated reviews for product:',
              product.name,
              product.reviews,
            );
          }
        }
      }
    }
  }
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  console.log('Products updated with sizes, colors, and reviews.');
};
updateProductsData();
