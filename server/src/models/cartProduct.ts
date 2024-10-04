import mongoose, { Schema } from "mongoose";
import { IProduct } from "../utils/type";

// Tạo schema cho product
const addToCart = new Schema(
  {
    productId: String,
    quantity: Number,
    userId: String,
  },
  {
    timestamps: true, // tự động tạo `createdAt` và `updatedAt`
  }
);

// Tạo model từ schema và export
const addToCartModel = mongoose.model("addToCart", addToCart);
export default addToCartModel;
