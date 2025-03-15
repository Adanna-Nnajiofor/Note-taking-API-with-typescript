import { Request, Response, NextFunction } from "express";
import { noteValidationSchema } from "../validations/noteValidation";

export const validateNote = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
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
