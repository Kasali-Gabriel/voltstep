import { model, models, Schema } from 'mongoose';

const ProductSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: String,
  description: String,
  slug: String,
  price: Number,
  quantity: Number,
  src: [String],
});

const SubcategorySchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: String,
  slug: String,
  parent_category: Number,
  products: [ProductSchema],
});

const CategorySchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: String,
  slug: String,
  parent_category: Number,
  subcategories: [SubcategorySchema],
  products: [ProductSchema],
});

const ProductsDataSchema = new Schema({
  id: { type: Number, required: true, unique: true },
  name: String,
  slug: String,
  categories: [CategorySchema],
});

const ProductsCatalogSchema = new Schema({
  _id: String,
  products_data: [ProductsDataSchema],
});

const ProductsCatalog =
  models.ProductsCatalog || model('ProductsCatalog', ProductsCatalogSchema);

export default ProductsCatalog;
