import { ICategory } from "../../types/category.types";
import axiosInstance from "../../utils/axiosConfig";

const getCategories = async () => {
  const response = await axiosInstance.get("/category");
  return response.data.data;
};

const createCategory = async (data: ICategory) => {
  const response = await axiosInstance.post("/category", data);
  return response.data.data;
};

const editCategory = async (data: ICategory) => {
  const response = await axiosInstance.put(`/category/${data._id}`, {
    name: data.name,
    description: data.description,
  });
  return response.data.data;
};

const deleteCategory = async (ids: string[]) => {
  const response = await axiosInstance.delete("/category", {
    data: { ids: ids },
  });
  return response.data.data;
};

export const categoryService = {
  getCategories,
  createCategory,
  editCategory,
  deleteCategory,
};
