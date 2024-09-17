import { Response, Request, NextFunction } from "express";
import HttpStatusCode from "../utils/HttpStatusCode";
import jwt, { JwtPayload } from "jsonwebtoken";

export const authToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies?.token || req.headers["authorization"]; // Lấy token từ cookie hoặc header

    if (!token) {
      return res.status(HttpStatusCode.BadRequest).json({
        message: "Token not found",
        data: [],
        error: true,
        success: false,
      });
    }

    jwt.verify(
      token,
      process.env.TOKEN_SECRET || "default-secret-key",
      (
        error: jwt.VerifyErrors | null,
        decoded: JwtPayload | string | undefined
      ) => {
        console.log(error);
        console.log("decoded", decoded);

        if (error) {
          console.log('JWT verification error:', error);
          return res.status(401).json({ message: 'Unauthorized' });
        }

        if (decoded && typeof decoded !== 'string') {
          // Kiểm tra nếu decoded là JwtPayload (một object) trước khi truy cập các thuộc tính
          req. = {
            id: (decoded as JwtPayload)._id // Sử dụng as JwtPayload để đảm bảo an toàn
          };
        } else {
          return res.status(400).json({ message: 'Invalid token format' });
        }

        next();
      }
    );
  } catch (error) {
    return res.status(HttpStatusCode.BadRequest).json({
      message: error || error,
      data: [],
      error: true,
      success: false,
    });
  }
};
