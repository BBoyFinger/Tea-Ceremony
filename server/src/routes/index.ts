import express from "express";
import authController from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";
import categoryController from "../controllers/categoryController";
import { productController } from "../controllers/productController";
import orderController from "../controllers/orderController";
import addToCartModel from "../models/cartProduct";

const router = express.Router();

router.post("/signup", authController.userSignUp);
router.post("/signin", authController.userSignIn);
router.get("/user-detail", authMiddleware, authController.userDetail);
router.get("/logout", authController.userLogout);
router.get("/user", authMiddleware, authController.getAllUser);
router.delete("/users", authMiddleware, authController.deleteUsers);
router.post("/update-user", authMiddleware, authController.updateUser);
router.post("/addtocart", authMiddleware, authController.addToCart);
router.get(
  "/countAddToCartProduct",
  authMiddleware,
  authController.countAddToCart
);

//Category
router.post("/category", authMiddleware, categoryController.addCategory);
router.put("/category/:id", authMiddleware, categoryController.editCategory);
router.delete("/category", authMiddleware, categoryController.deleteCategories);
router.get("/category", categoryController.getAllCategories);
router.get("/category/:id", categoryController.getCategoryById);

//Product
router.post("/upload-product", authMiddleware, productController.createProduct);
router.put("/product/:id", authMiddleware, productController.updateProduct);
router.delete("/product", authMiddleware, productController.deleteProducts);
router.get("/product", productController.getAllProducts);
router.get("/product/:id", productController.getProductById);
router.get(
  "/products/category/:category",
  productController.getProductByCategory
);
router.get("/products/best-sellers", productController.getProductBestSellers);
router.get("/products/best-reviewed", productController.getProductBestReviews);
router.get("/products/new-arrivals", productController.getProductNewArrivals);
router.get("/products/product-featured", productController.getFeaturedProducts);

//Order
router.post("/order", authMiddleware, orderController.createOrder);
router.put("/order/:id", authMiddleware, orderController.updateOrder);
router.delete("/order", authMiddleware, orderController.deleteOrders);
router.get("/order", orderController.getAllOrders);
router.get("/order/:id", orderController.getOrderById);

export default router;
