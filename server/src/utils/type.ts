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
  productName: string;
  description: string;
  price: number;
  currency: string;
  quantity: number;
  images: [
    {
      url: string;
      title: string;
    }
  ]; // danh sách các URL hình ảnh sản phẩm
  category: mongoose.Types.ObjectId; // có thể là "Teapots", "Cups", "Infusers", v.v.
  material: string;
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
  shippingInfo: string; // ví dụ: "Free Shipping", "Fast Delivery"
  brand: string; // thương hiệu
}

export interface IOrder {
  user: mongoose.Schema.Types.ObjectId;
  products: {
    product: mongoose.Schema.Types.ObjectId;
    quantity: number;
    price: number;
  }[];
  totalPrice: number;
  status: string;
  paymentMethod: string;
  shippingAddress: {
    address: string;
    city: string;
    postalCode: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
