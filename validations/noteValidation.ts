import Joi from "joi";

// Joi schema for validating MongoDB ObjectId (24-character hex string)
const objectIdSchema = Joi.string().hex().length(24).required().messages({
  "string.empty": "{#label} is required",
  "string.hex": "{#label} must be a valid MongoDB ObjectId",
  "string.length": "{#label} must be exactly 24 characters long",
});

// Note validation schema
export const noteValidationSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title is required",
  }),
  content: Joi.string().required().messages({
    "string.empty": "Content is required",
  }),
  category: objectIdSchema.label("Category ID"), // Valid MongoDB ObjectId
  user: objectIdSchema.label("User ID"), // Valid MongoDB ObjectId
});
