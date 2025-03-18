import { Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AuthRequest } from "../interfaces/Auth";
import { IUser } from "../interfaces/User";
import User from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET;

// Ensure JWT_SECRET exists before starting the server
if (!JWT_SECRET) {
  console.error(" Missing JWT_SECRET in environment variables. Exiting...");
  process.exit(1);
}

export const authenticateUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ success: false, message: "No token provided" });
      return;
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    if (!decoded?.userId) {
      res.status(401).json({ success: false, message: "Invalid token" });
      return;
    }

    // Fetch user from DB and exclude password
    const user: IUser | null = await User.findById(decoded.userId).select(
      "-password"
    );
    if (!user) {
      res.status(401).json({ success: false, message: "User not found" });
      return;
    }

    req.user = user; // Attach user to request
    next(); // Proceed to next middleware
  } catch (error: unknown) {
    if (error instanceof Error) {
      if (error.name === "TokenExpiredError") {
        res.status(401).json({ success: false, message: "Token expired" });
        return;
      }
      if (error.name === "JsonWebTokenError") {
        res.status(401).json({ success: false, message: "Invalid token" });
        return;
      }

      console.error("🔥 Authentication error:", error.message);
      res.status(500).json({ success: false, message: "Server error" });
    } else {
      res
        .status(500)
        .json({ success: false, message: "An unknown error occurred" });
    }
  }
};
