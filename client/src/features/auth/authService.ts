import axiosInstance from "../../utils/axiosConfig";

const getAllUser = async () => {
  const response = await axiosInstance.get("/user");
  return response.data.data;
};

const authService = {
  getAllUser,
};

export default authService;
 