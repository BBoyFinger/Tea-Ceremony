import mongoose from "mongoose";

export interface IUser {
  name?: string;
  email: string;
  password?: string;
  pictureImg: string;
  role: string;
  status: string;
}

export interface Account {
  status: {
    Active: "Active";
    Inactive: "Inactive";
  };
}

export interface ICategory {
  name: string;
  description: string;
  productCount: number;
}

export interface IProduct {
  id?: string; // optional vì trong một số trường hợp có thể chưa có id khi tạo mới
  name: string;
  description: string;
  price: number;
  currency: string;
  images: string[]; // danh sách các URL hình ảnh sản phẩm
  category: mongoose.Types.ObjectId; // có thể là "Teapots", "Cups", "Infusers", v.v.

  material: string;
  color: string;

  sku: string; // mã quản lý sản phẩm
  stockQuantity: number; // số lượng sản phẩm tồn kho
  availability: string; // ví dụ: "In Stock", "Out of Stock"

  averageRating: number; // đánh giá trung bình
  reviewsCount: number; // số lượng đánh giá
  reviews: Array<{
    user: string;
    rating: number;
    comment: string;
  }>;

  discount?: number; // optional vì không phải lúc nào cũng có giảm giá
  isFeatured?: boolean; // có phải sản phẩm nổi bật hay không
  tags?: string[]; // các thẻ liên quan đến sản phẩm
  shippingInfo: string; // ví dụ: "Free Shipping", "Fast Delivery"
  brand: string; // thương hiệu
}
