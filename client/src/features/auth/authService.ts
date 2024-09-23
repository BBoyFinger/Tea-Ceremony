import { User } from "../../types/user.types";
import axiosInstance from "../../utils/axiosConfig";

const getAllUser = async () => {
  const response = await axiosInstance.get("/user");
  return response.data.data;
};

const deleteUser = async (id: string) => {
  const response = await axiosInstance.delete(`/user/${id}`);
  return response.data.data;
};

const updateUser = async (data: User) => {
  const response = await axiosInstance.post("/update-user", data);
  return response.data.data
}

const authService = {
  getAllUser,
  deleteUser,
  updateUser
};

export default authService;
