import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in environment variables");
}

/**
 * Register a new user
 */
export const registerUser: RequestHandler = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res
        .status(400)
        .json({ success: false, message: "All fields are required" });
      return; // Ensure function execution stops here
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User already exists. Please log in.",
      });
      return;
    }

    const newUser: IUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({
      success: true,
      message:
        "User registered successfully. Please login using your email and password to obtain a token.",
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Registration failed", error });
  }
};

/**
 * Login user and return JWT
 */
export const loginUser: RequestHandler = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({
        success: false,
        message:
          "User not found. Please register first before attempting to log in.",
      });
      return;
    }

    if (!(await user.comparePassword(password))) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password. Please try again.",
      });
      return;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .status(200)
      .json({ success: true, message: "Login successful.", token });
  } catch (error) {
    res.status(500).json({ success: false, message: "Login failed", error });
  }
};
