import { Request } from "express";
import { IUser } from "./User";

export interface AuthRequest extends Request {
  user?: IUser & { userId?: string }; // Authenticated user object from JWT
}
