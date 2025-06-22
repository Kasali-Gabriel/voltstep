// TODO on creating/updating a product, {
// const formatted = {
//     id: product.id,
//     name: product.name,
//     description: product.description,
//     price: product.price,
//     sizes: product.sizes,
//     colors: product.colors,
//     tags: product.tags.map((tag) => tag.name),
//     subcategory: product.subcategory?.name || '',
//     category: product.subcategory?.category?.name || '',
//     catalog: product.subcategory?.category?.catalog?.name || '',
//   };

//   await meiliClient.index('products').addDocuments([formatted]);}

// TODO on deleting a product, {await meiliClient.index('products').deleteDocument(productId);
// }
