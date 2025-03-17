import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../interfaces/Auth";
import { IUser } from "../interfaces/User";
import User from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const authenticateUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      res.status(401).json({ success: false, message: "No token provided" });
      return;
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };
    if (!decoded || !decoded.userId) {
      res.status(401).json({ success: false, message: "Invalid token" });
      return;
    }

    // Fetch user from DB
    const user: IUser | null = await User.findById(decoded.userId).select(
      "-password"
    );
    if (!user) {
      res.status(401).json({ success: false, message: "User not found" });
      return;
    }

    req.user = user; // Attach user to request
    next(); //  Call next() to continue execution
  } catch (error) {
    res.status(401).json({ success: false, message: "Authentication failed" });
    return;
  }
};
