import express from "express";
import authController from "../controllers/auth";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/signup", authController.userSignUp);
router.post("/signin", authController.userSignIn);
router.get("/user-detail", authMiddleware, authController.userDetail);
router.get("/logout", authController.userLogout);
router.get("/user", authController.getAllUser);
router.delete("/user/:id", authMiddleware, authController.deleteUser);
router.post("/update-user", authMiddleware, authController.updateUser);

export default router;
