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
): Promise<Response | void> => {
  try {
    const authHeader = req.header("Authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ success: false, message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    if (!JWT_SECRET) {
      return res
        .status(500)
        .json({ success: false, message: "Server configuration error" });
    }

    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    if (!decoded?.userId) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }

    // Fetch user from DB and exclude password
    const user: IUser | null = await User.findById(decoded.userId).select(
      "-password"
    );
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    req.user = user; // Attach user to request
    next(); // Proceed to next middleware
  } catch (error: unknown) {
    console.error(" Authentication error:", error);

    let message = "Server error";
    if (error instanceof Error) {
      if (error.name === "TokenExpiredError") message = "Token expired";
      if (error.name === "JsonWebTokenError") message = "Invalid token";
    }

    return res.status(401).json({ success: false, message });
  }
};
