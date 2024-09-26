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

const authService = {
  getAllUser,
  deleteUsers,
  updateUserRole,
};

export default authService;
