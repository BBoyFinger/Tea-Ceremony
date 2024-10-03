import { Request, Response } from "express";
import ProductModel from "../models/productModel";
import HttpStatusCode from "../utils/HttpStatusCode";
import uploadProductPermission from "../utils/permission";
import categoryModel from "../models/categoryModel";

export const productController = {
  createProduct: async (req: Request, res: Response): Promise<Response> => {
    try {
      const sessionUserId = req.userId;

      if (!uploadProductPermission(sessionUserId)) {
        res.status(HttpStatusCode.Unauthorized).json({
          message: "Permission denied",
        });
      }

      const updateProduct = new ProductModel(req.body);
      const saveProduct = await updateProduct.save();

      return res.status(HttpStatusCode.Created).json({
        message: "Create product successfully!",
        data: saveProduct,
      });
    } catch (error) {
      return res.status(HttpStatusCode.InternalServerError).json({
        message: error,
      });
    }
  },

  getAllProducts: async (req: Request, res: Response): Promise<Response> => {
    try {
      const products = await ProductModel.find()
        .populate("category")
        .sort({ createdAt: -1 });
      return res.status(HttpStatusCode.OK).json({
        message: "Get product successfully!",
        data: products,
      });
    } catch (error) {
      return res.status(HttpStatusCode.InternalServerError).json({
        message: error,
      });
    }
  },

  getProductByCategory: async (
    req: Request,
    res: Response
  ): Promise<Response> => {
    try {
      const categoryName = req.params.category;

      const category = await categoryModel.findOne({
        name: { $regex: new RegExp(categoryName, "i") },
      });
      if (!category) {
        return res.status(HttpStatusCode.NotFound).json({
          message: "Category not found",
        });
      }
      // Tìm sản phẩm dựa trên category
      const products = await ProductModel.find({
        category: category._id,
      }).populate("category");

      return res.status(HttpStatusCode.OK).json({
        message: "Get Product by Category Successfully",
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
      const product = await ProductModel.findById(id).populate('category');
      if (!product) {
        return res.status(HttpStatusCode.NotFound).json({
          message: "Product not found",
        });
      }

      return res.status(HttpStatusCode.OK).json({
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
      const sessionUserId = req.userId;

      if (!uploadProductPermission(sessionUserId)) {
        res.status(HttpStatusCode.Unauthorized).json({
          message: "Permission denied",
        });
      }
      const updateProduct = await ProductModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      if (!updateProduct) {
        return res.status(HttpStatusCode.NotFound).json({
          message: "Product not found!",
        });
      }
      return res.status(HttpStatusCode.OK).json({
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

      return res.status(HttpStatusCode.OK).json({
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
