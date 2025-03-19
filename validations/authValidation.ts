import { Request, Response, NextFunction } from "express";
import Joi from "joi";

// Schema for user registration validation
const registerSchema = Joi.object({
  username: Joi.string().trim().min(3).max(30).required(),
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().trim().min(6).required(),
});

// Schema for user login validation
const loginSchema = Joi.object({
  email: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().trim().required(),
});

// Middleware for validating registration
export const registerValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = registerSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({ success: false, errors: error.details });
  }

  next();
};

// Middleware for validating login
export const loginValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = loginSchema.validate(req.body, { abortEarly: false });

  if (error) {
    return res.status(400).json({ success: false, errors: error.details });
  }

  next();
};
