import { Request, Response, NextFunction } from "express";
import { noteValidationSchema } from "../validations/noteValidation";
import { AuthRequest } from "../interfaces/Auth";

export const validateNote = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  req.body.user = req.user?._id || req.user?.userId;

  const { error, value } = noteValidationSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    res.status(400).json({
      success: false,
      errors: error.details.map((detail) => detail.message),
    });
    return;
  }

  req.body = value;
  next();
};
