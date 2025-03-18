import { Response, NextFunction } from "express";
import { noteValidationSchema } from "../validations/noteValidation";
import { AuthRequest } from "../interfaces/Auth";

export const validateNote = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  // Ensure user is a string
  req.body.user =
    req.user?._id?.toString() || req.user?.userId?.toString() || "";

  const { error, value } = noteValidationSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    res.status(400).json({
      success: false,
      errors: error.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      })),
    });
    return;
  }

  req.body = value;
  next();
};
