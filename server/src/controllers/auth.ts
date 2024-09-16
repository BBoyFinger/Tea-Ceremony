import { Request, Response } from "express";
import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import { IUser } from "../utils/type";
import HttpStatusCode from "../utils/HttpStatusCode";

const authController = {
  userSignUp: async (req: Request, res: Response) => {
    try {
      const { name, email, password } = req.body;

      if (!email) {
        throw new Error("Please enter your email!");
      }
      if (!password) {
        throw new Error("Please enter your password!");
      }
      if (!name) {
        throw new Error("Please enter your name!");
      }

      const salt = bcrypt.genSaltSync(10);
      const hashPassword = await bcrypt.hashSync(password, salt);

      if (!hashPassword) {
        throw new Error("Somthing went wrong!");
      }

      //Check email
      const isEmail = await userModel.find(email);
      if (isEmail) {
        res
          .status(HttpStatusCode.InternalServerError)
          .json("Duplicate email! Please enter other email!");
      }

      const payload = {
        ...req.body,
        password: hashPassword,
      };

      const registerUser = new userModel<IUser>(payload);
      const saveUser = registerUser.save();

      res.status(HttpStatusCode.OK).json({
        message: "Signup user successfully!",
        data: saveUser,
        error: false,
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        message: error,
        error: true,
        sucess: false,
      });
    }
  },
  userSignIn: async (req: Request, res: Response) => {},
};

export default authController;
