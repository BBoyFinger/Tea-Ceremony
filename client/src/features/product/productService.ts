import { IProduct } from "../../types/product.types";
import axiosInstance from "../../utils/axiosConfig";

const getProducts = async () => {
  const response = await axiosInstance.get("/product");
  return response.data.data;
};

const createProduct = async (data: IProduct) => {
  const response = await axiosInstance.post("/upload-product", data);
  return response.data.data;
};




const editProduct = async (data: IProduct) => {
  console.log(data);
  const response = await axiosInstance.put(`/product/${data._id}`, {
    productName: data.productName,
    price: data.price,
    description: data.description,
    quantity: data.quantity,

    images: data.images, // Thêm mảng hình ảnh
    category: data.category, // Thêm danh mục
    material: data.material, // Thêm chất liệu
    stockQuantity: data.stockQuantity, // Thêm số lượng tồn kho
    availability: data.availability, // Thêm trạng thái hàng hóa
    averageRating: data.averageRating, // Thêm đánh giá trung bình
    reviewsCount: data.reviewsCount, // Thêm số lượng đánh giá
    reviews: data.reviews, // Thêm danh sách đánh giá
    discount: data.discount, // Thêm phần trăm giảm giá
    isFeatured: data.isFeatured, // Thêm thông tin nổi bật
    brand: data.brand, // Thêm thương hiệu
  });
  
  return response.data.data;
};

const deleteProduct = async (ids: string[]) => {
  const response = await axiosInstance.delete("/product", {
    data: { ids: ids },
  });
  return response.data.data;
};

export const productService = {
  getProducts,
  createProduct,
  editProduct,
  deleteProduct,
};
