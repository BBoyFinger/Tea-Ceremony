import { IProduct } from "../../types/product.types";
import axiosInstance from "../../utils/axiosConfig";

const getProducts = async () => {
  const response = await axiosInstance.get("/product");
  return response.data.data;
};

const createProduct = async (data: IProduct) => {
  const response = await axiosInstance.post("/product", data);
  return response.data.data;
};

const editProduct = async (data: IProduct) => {
  console.log(data._id)
  const response = await axiosInstance.put(`/product/${data._id}`, {
    name: data.name,
    description: data.description,
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
