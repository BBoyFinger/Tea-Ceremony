import { Request, Response } from "express";
import ProductModel from "../models/productModel";
import HttpStatusCode from "../utils/HttpStatusCode";

export const productController = {
  createProduct: async (req: Request, res: Response) => {
    try {
      const product = await ProductModel.create(req.body);
      return res.status(201).json({
        message: "Create product successfully!",
        data: product,
      });
    } catch (error) {
      return res.status(HttpStatusCode.InternalServerError).json({
        message: error,
      });
    }
  },

  getAllProducts: async (req: Request, res: Response) => {
    try {
      const products = await ProductModel.find();
      return res.status(201).json({
        message: "Get product successfully!",
        data: products,
      });
    } catch (error) {
      return res.status(HttpStatusCode.InternalServerError).json({
        message: error,
      });
    }
  },

  getProductById: async (req: Request, res: Response) => {},

  updateProduct: async (req: Request, res: Response) => {},

  deleteProducts: async (req: Request, res: Response) => {},
};
