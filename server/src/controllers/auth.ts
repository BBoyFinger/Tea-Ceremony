import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { IUser } from "../utils/type";
import HttpStatusCode from "../utils/HttpStatusCode";
import UserModel from "../models/userModel";

const authController = {
  userSignUp: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { name, email, password } = req.body as IUser;

      // Kiểm tra xem email đã tồn tại chưa
      const isEmail = await UserModel.findOne({ email });

      if (isEmail) {
        return res.status(HttpStatusCode.Conflict).json({
          message: "User already exists!",
          error: true,
          success: false,
        });
      }

      // Kiểm tra các trường bắt buộc
      if (!email || !password || !name) {
        return res.status(HttpStatusCode.BadRequest).json({
          message: "Please fill in all required fields!",
          error: true,
          success: false,
        });
      }

      // Tạo salt và hash mật khẩu
      const salt = bcrypt.genSaltSync(10);
      const hashPassword = bcrypt.hashSync(password, salt);

      if (!hashPassword) {
        throw new Error("Something went wrong while hashing the password!");
      }

      // Tạo payload người dùng
      const payload: IUser = {
        ...req.body,
        password: hashPassword,
      };

      const registerUser = new UserModel<IUser>(payload);
      const saveUser = await registerUser.save();

      return res.status(HttpStatusCode.OK).json({
        message: "User created successfully!",
        data: saveUser,
        error: false,
        success: true,
      });
    } catch (error: any) {
      return res.status(HttpStatusCode.InternalServerError).json({
        message: error.message || "An error occurred",
        error: true,
        success: false,
      });
    }
  },

  userSignIn: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body;
      // Kiểm tra email và password có tồn tại
      if (!email || !password) {
        return res.status(HttpStatusCode.BadRequest).json({
          message: "Please enter both email and password!",
          error: true,
          success: false,
        });
      }

      // Tìm người dùng
      const user = await UserModel.findOne({ email });
      if (!user) {
        return res.status(HttpStatusCode.NotFound).json({
          message: "User not found!",
          error: true,
          success: false,
        });
      }

      // So sánh mật khẩu
      const checkPassword = bcrypt.compareSync(
        password,
        user.password as string
      );
      if (!checkPassword) {
        return res.status(HttpStatusCode.Unauthorized).json({
          message: "Invalid password!",
          error: true,
          success: false,
        });
      }

      const payload = {
        _id: user.id,
        email: user.email,
      };

      const token = await jwt.sign(
        payload,
        process.env.JWT_SECRET_KEY || "default-secret-key",
        {
          expiresIn: 60 * 60 * 8,
        }
      );

      const tokenOption = {
        httpOnly: true,
        secure: true,
      };

      // Trả về kết quả đăng nhập thành công
      return res
        .cookie("token", token, tokenOption)
        .status(HttpStatusCode.OK)
        .json({
          message: "Login successful!",
          data: { token },
          error: false,
          success: true,
        });
    } catch (error: any) {
      return res.status(HttpStatusCode.InternalServerError).json({
        message: error.message || "An error occurred",
        error: true,
        success: false,
      });
    }
  },

  userDetail: async (req: Request, res: Response): Promise<Response> => {
    try {
      const userDetail = await UserModel.findById(req.userId).select(
        "-password"
      );

      if (!userDetail) {
        throw new Error("Something went wrong");
      }
      return res.status(HttpStatusCode.OK).json({
        message: "Get user successfully!",
        data: userDetail,
        error: false,
        success: true,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message || error,
        error: true,
        sucess: false,
      });
    }
  },
  userLogout: async (req: Request, res: Response): Promise<Response> => {
    try {
      res.clearCookie("token");
      return res.status(HttpStatusCode.OK).json({
        message: "Logged out successfully",
        error: false,
        success: true,
        data: [],
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message || error,
        error: true,
        sucess: false,
      });
    }
  },

  getAllUser: async (req: Request, res: Response): Promise<Response> => {
    try {
    

      const users = await UserModel.find();

      if (!users) {
        throw new Error("Something went wrong ");
      }

      return res.status(200).json({
        message: "Get All User successfully",
        data: users,
        error: true,
        sucess: false,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message || error,
        error: true,
        sucess: false,
      });
    }
  },
  deleteUser: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;

      const deleteUser = await UserModel.findByIdAndDelete(id);
      return res.status(200).json({
        message: "Delete User successfully",
        data: deleteUser,
        error: true,
        sucess: false,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message || error,
        error: true,
        sucess: false,
      });
    }
  },
  updateUser: async (req: Request, res: Response): Promise<Response> => {
    try {

      const userSession = req.userId;

      const { userId, email, name, role } = req.body;

      

      const payload = {
        ...(email && { email: email }),
        ...(name && { name: name }),
        ...(role && { role: role }),
      };

      const user = await UserModel.findById(userSession);

      console.log("user role", user?.role)

      const updateUser = await UserModel.findByIdAndUpdate(userId, payload);
     

      return res.status(HttpStatusCode.OK).json({
        data: updateUser,
        message: "Update user successfully!",
        success: true,
        error: false,
      });
    } catch (error: any) {
      return res.status(500).json({
        message: error.message || error,
        error: true,
        sucess: false,
      });
    }
  },
};

export default authController;
