import { Request, Response, NextFunction } from "express";
import { idParamSchema } from "../validations/categoryValidation";

export const validateIdParam = (
  req: Request,
  res: Response,
  next: NextFunction
): Response | void => {
  const { error } = idParamSchema.validate({ id: req.params.id });

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next(); // Continue to the next middleware
};
