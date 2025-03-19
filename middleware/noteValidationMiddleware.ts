import { Response, NextFunction } from "express";
import { noteValidationSchema } from "../validations/noteValidation";
import { AuthRequest } from "../interfaces/Auth";

export const validateNote = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Response | void => {
  try {
    // Ensure the user is authenticated
    if (!req.user || (!req.user._id && !req.user.userId)) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User ID is missing",
      });
    }

    // Convert user ID to string and assign it to req.body
    req.body.user = req.user._id?.toString() || req.user.userId?.toString();

    // Validate request body
    const { error, value } = noteValidationSchema.validate(req.body, {
      abortEarly: false, // Show all validation errors at once
      stripUnknown: true, // Remove unknown fields
    });

    if (error) {
      return res.status(400).json({
        success: false,
        errors: error.details.map((detail) => ({
          field: detail.path.join("."),
          message: detail.message,
        })),
      });
    }

    req.body = value; // Assign validated data
    next();
  } catch (err) {
    console.error("Validation Error:", err);
    return res.status(500).json({
      success: false,
      message: "Internal server error during validation",
    });
  }
};
