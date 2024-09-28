import { Request, Response } from "express";
import ProductModel from "../models/productModel";
import HttpStatusCode from "../utils/HttpStatusCode";

export const productController = {
  createProduct: async (req: Request, res: Response): Promise<Response> => {
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

  getAllProducts: async (req: Request, res: Response): Promise<Response> => {
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

  getProductById: async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      const product = await ProductModel.findById(id);
      if (!product) {
        return res.status(HttpStatusCode.NotFound).json({
          message: "Product not found",
        });
      }

      return res.status(201).json({
        message: "Get product successfully!",
        data: product,
      });
    } catch (error) {
      return res.status(HttpStatusCode.InternalServerError).json({
        message: error,
      });
    }
  },

  updateProduct: async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    try {
      const updateProduct = await ProductModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!updateProduct) {
        return res.status(HttpStatusCode.NotFound).json({
          message: "Product not found!",
        });
      }
      return res.status(201).json({
        message: "Updated product successfully!",
        data: updateProduct,
      });
    } catch (error) {
      return res.status(HttpStatusCode.InternalServerError).json({
        message: error,
      });
    }
  },

  deleteProducts: async (req: Request, res: Response): Promise<Response> => {
    try {
      const { ids } = req.body;
      if (ids.length === 1) {
        const deleteProduct = await ProductModel.findByIdAndDelete(ids[0]);
        if (!deleteProduct) {
          return res.status(HttpStatusCode.NotFound).json({
            message: "Product not found!",
          });
        }
        return res.status(HttpStatusCode.OK).json({
          message: "Delete product successfully!",
        });
      }

      const deleteProducts = await ProductModel.deleteMany({
        _id: { $in: ids },
      });

      return res.status(201).json({
        message: `${deleteProducts.deletedCount} products deleted successfully`,
        data: deleteProducts,
      });
    } catch (error) {
      return res.status(HttpStatusCode.InternalServerError).json({
        message: error,
      });
    }
  },
};
