

// TODO: When  a product is updated in the admin dashboard, invalidate its cached version:
// export async function updateProduct(slug: string, updateData: any) {
//   const updated = await prisma.product.update({
//     where: { slug },
//     data: updateData,
//   });

//   // Invalidate cache
//   await redis.del(`product:${slug}`);

//   return updated;
// }
