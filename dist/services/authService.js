"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
    throw new Error("Missing JWT_SECRET in environment variables");
}
/**
 * Custom Error Class for better debugging
 */
class AuthError extends Error {
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
/**
 * Register a new user
 */
const registerUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, email, password } = userData;
    if (!username || !email || !password) {
        throw new AuthError("All fields are required", 400);
    }
    const existingUser = yield User_1.default.findOne({ email });
    if (existingUser) {
        throw new AuthError("User already exists. Please log in.", 400);
    }
    // Hash password before saving
    const hashedPassword = yield bcryptjs_1.default.hash(password, 10);
    const newUser = new User_1.default({
        username,
        email,
        password: hashedPassword,
    });
    yield newUser.save();
    return newUser;
});
exports.registerUser = registerUser;
/**
 * Login user and return JWT token
 */
const loginUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = userData;
    if (!email || !password) {
        throw new AuthError("Email and password are required", 400);
    }
    const user = yield User_1.default.findOne({ email });
    if (!user) {
        throw new AuthError("Invalid credentials. Please try again.", 401);
    }
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new AuthError("Invalid credentials. Please try again.", 401);
    }
    // Generate JWT Token
    if (!JWT_SECRET) {
        throw new AuthError("JWT secret is missing", 500);
    }
    const token = jsonwebtoken_1.default.sign({ userId: user._id }, JWT_SECRET, {
        expiresIn: "1h",
    });
    return token;
});
exports.loginUser = loginUser;
