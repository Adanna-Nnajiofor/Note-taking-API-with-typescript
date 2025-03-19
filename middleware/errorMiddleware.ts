import { Request, Response, NextFunction } from "express";

interface CustomError extends Error {
  statusCode?: number;
}

// Custom error-handling middleware
export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("Error:", err.message || err);

  // Set status code (default to 500 if not specified)
  const statusCode = err.statusCode ?? 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
};
