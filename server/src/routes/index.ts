import express from "express";
import authController from "../controllers/auth";
import { authToken } from "../middleware/authToken";

const router = express.Router();

router.post("/signup", authController.userSignUp);
router.post("/signin", authController.userSignIn);
router.get("/user-detail", authToken, authController.userDetail);

export default router;
