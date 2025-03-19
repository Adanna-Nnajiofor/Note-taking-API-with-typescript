import { Request, Response, NextFunction } from "express";
import { categoryValidationSchema } from "../validations/categoryValidation";

export const validateCategory = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const { error, value } = categoryValidationSchema.validate(req.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  if (error) {
    return res.status(400).json({
      success: false,
      errors: error.details.map((detail) => ({
        field: detail.path.join("."), // Shows which field has the error
        message: detail.message,
      })),
    });
  }

  req.body = value;
  next(); // Continue to the next middleware
};
