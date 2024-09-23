import axiosInstance from "../../utils/axiosConfig";

const getAllUser = async () => {
  const response = await axiosInstance.get("/user");
  return response.data.data;
};

const deleteUser = async (id: string) => {
  const response = await axiosInstance.delete(`/user/${id}`);
  return response.data.data;
};

const updateUserRole = async (data: any) => {
  const response = await axiosInstance.post("/update-user", data);
  return response.data.data;
};

const authService = {
  getAllUser,
  deleteUser,
  updateUserRole,
};

export default authService;
