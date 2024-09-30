export interface IProduct {
  _id?: string;
  productName?: string;
  description?: string;
  price?: number;
  currency?: string;
  quantity?: number;
  images: { url: string; title: string }[];
  category?: string;
  material?: string;
  stockQuantity?: number;
  availability?: string;
  averageRating?: number;
  reviewsCount?: number;
  reviews?: {
    user: string;
    rating: number;
    comment: string;
  }[];
  discount?: number;
  isFeatured?: boolean;
  shippingInfo?: string;
  brand?: string;
}
