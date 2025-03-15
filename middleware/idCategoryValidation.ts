import { Request, Response, NextFunction } from "express";
import { idParamSchema } from "../validations/categoryValidation";

export const validateIdParam = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const { error } = idParamSchema.validate({ id: req.params.id });

  if (error) {
    res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
    return;
  }

  next();
};
