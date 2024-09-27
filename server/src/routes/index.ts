import express from "express";
import authController from "../controllers/authController";
import { authMiddleware } from "../middleware/authMiddleware";
import categoryController from "../controllers/categoryController";

const router = express.Router();

router.post("/signup", authController.userSignUp);
router.post("/signin", authController.userSignIn);
router.get("/user-detail", authMiddleware, authController.userDetail);
router.get("/logout", authController.userLogout);
router.get("/user", authController.getAllUser);
router.delete("/users", authMiddleware, authController.deleteUsers);
router.post("/update-user", authMiddleware, authController.updateUser);

router.post("/category", authMiddleware, categoryController.addCategory);
router.put("/category/:id", authMiddleware, categoryController.editCategory);
router.delete("/category", authMiddleware, categoryController.deleteCategories);
router.get("/category", categoryController.getAllCategories);
router.get("/category/:id", categoryController.getCategoryById);

export default router;
