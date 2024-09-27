export interface IProduct {
   _id: string; // ID thường là ObjectId trong MongoDB, nên dùng string
   name: string;
   description: string;
   price: number;
   currency: string;
   images?: string[]; // Mảng chứa các URL hình ảnh
   category: string; // Đây là ObjectId tham chiếu đến model Category, nhưng có thể sử dụng string nếu chỉ lưu ID
   material: string;
   stockQuantity: number;
   availability: string;
 
   averageRating: number;
   reviewsCount: number;
   reviews: {
     user: string;
     rating: number;
     comment: string;
   }[];
 
   discount?: number;
   isFeatured: boolean;
   tags?: string[];
   shippingInfo: string;
   brand: string;
 }