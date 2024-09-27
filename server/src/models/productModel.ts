import mongoose, { Schema } from "mongoose";
import { IProduct } from "../utils/type";

// Tạo schema cho product
const ProductSchema: Schema<IProduct> = new Schema(
  {
    productName: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    currency: { type: String, required: true },
    images: { type: [String], required: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category", // Liên kết với model Category
      required: true,
    },
    material: { type: String, required: true },
    stockQuantity: { type: Number, required: true },
    availability: { type: String, required: true },

    averageRating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    reviews: [
      {
        user: { type: String, required: true },
        rating: { type: Number, required: true },
        comment: { type: String, required: true },
      },
    ],

    discount: { type: Number },
    isFeatured: { type: Boolean, default: false },
    tags: { type: [String] },
    shippingInfo: { type: String, required: true },
    brand: { type: String, required: true },
  },
  {
    timestamps: true, // tự động tạo `createdAt` và `updatedAt`
  }
);

// Tạo model từ schema và export
const ProductModel = mongoose.model<IProduct>("Product", ProductSchema);
export default ProductModel;
