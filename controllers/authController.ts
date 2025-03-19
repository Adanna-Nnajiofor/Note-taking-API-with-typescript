import { RequestHandler } from "express";
import * as authService from "../services/authService";

/**
 * Register a new user
 */
export const registerUser: RequestHandler = async (req, res) => {
  try {
    const user = await authService.registerUser(req.body);
    res.status(201).json({
      success: true,
      message: "User registered successfully. Please log in.",
      user,
    });
  } catch (error: any) {
    console.error("Registration Error:", error.message);
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Registration failed",
    });
  }
};

/**
 * Login user and return JWT
 */
export const loginUser: RequestHandler = async (req, res) => {
  try {
    const token = await authService.loginUser(req.body);
    res.status(200).json({
      success: true,
      message: "Login successful.",
      token,
    });
  } catch (error: any) {
    console.error("Login Error:", error.message);
    res.status(error.status || 500).json({
      success: false,
      message: error.message || "Login failed",
    });
  }
};
