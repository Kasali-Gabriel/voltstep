import { model, models, Schema } from 'mongoose';

const ReviewSchema = new Schema({
  reviewer: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: false },
  date: { type: Date, default: Date.now },
});

const ProductSchema = new Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  slug: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  src: {
    type: [String],
    required: true,
    validate: {
      validator: function (value: string[]) {
        return value.length <= 8;
      },
    },
  },
  sizes: { type: [String], required: false },
  colors: { type: [String], required: false },
  tags: {
    type: [String],
    enum: ['new arrival', 'bestseller', 'flash sale', 'back in stock'],
    required: false,
  },

  reviews: [ReviewSchema],
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
