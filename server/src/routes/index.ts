import express from "express";
import authController from "../controllers/auth";
import { authMiddleware } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/signup", authController.userSignUp);
router.post("/signin", authController.userSignIn);
router.get("/user-detail", authMiddleware, authController.userDetail);
router.get("/logout", authController.userLogout);
router.get("/user", authController.getAllUser);
router.delete("/user/:id", authController.deleteUser)

export default router;
