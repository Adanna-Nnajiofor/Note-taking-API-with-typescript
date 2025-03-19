import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User, { IUser } from "../models/User";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error("Missing JWT_SECRET in environment variables");
}

interface UserCredentials {
  username?: string;
  email: string;
  password: string;
}

/**
 * Custom Error Class for better debugging
 */
class AuthError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

/**
 * Register a new user
 */
export const registerUser = async (userData: UserCredentials) => {
  const { username, email, password } = userData;

  if (!username || !email || !password) {
    throw new AuthError("All fields are required", 400);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AuthError("User already exists. Please log in.", 400);
  }

  // Hash password before saving
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser: IUser = new User({
    username,
    email,
    password: hashedPassword,
  });

  await newUser.save();
  return newUser;
};

/**
 * Login user and return JWT token
 */
export const loginUser = async (userData: UserCredentials) => {
  const { email, password } = userData;

  if (!email || !password) {
    throw new AuthError("Email and password are required", 400);
  }

  const user = await User.findOne({ email });
  if (!user) {
    throw new AuthError("Invalid credentials. Please try again.", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new AuthError("Invalid credentials. Please try again.", 401);
  }

  // Generate JWT Token
  if (!JWT_SECRET) {
    throw new AuthError("JWT secret is missing", 500);
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
    expiresIn: "1h",
  });

  return token;
};
