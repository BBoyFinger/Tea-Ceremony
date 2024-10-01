import axios from "axios";

const url = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME_CLOUDINARY}/image/upload`;

const uploadImage = async (image: any) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "teaware_product");
  try {
    console.log(formData.get("file"));
    const response = await axios.post(url, formData, {
      withCredentials: false, // Tắt chế độ credentials
    });
    return response.data
  } catch (error) {
    console.error("Error uploading image:", error);
  }
};

export default uploadImage;
