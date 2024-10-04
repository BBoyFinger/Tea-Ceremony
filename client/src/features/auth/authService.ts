import axiosInstance from "../../utils/axiosConfig";

const getAllUser = async () => {
  const response = await axiosInstance.get("/user");
  return response.data.data;
};

const deleteUsers = async (selectedUserIds: string[]) => {
  const response = await axiosInstance.delete(`/users`, {
    data: { ids: selectedUserIds },
  });
  return response.data.data;
};

const updateUserRole = async (data: any) => {
  const response = await axiosInstance.post("/update-user", data);
  return response.data.data;
};

const addToCart = async (productId: any) => {
  const response = await axiosInstance.post("/addToCart", {
    productId: productId,
  });
  return response.data.data;
};

const authService = {
  getAllUser,
  deleteUsers,
  updateUserRole,
  addToCart,
};

export default authService;
