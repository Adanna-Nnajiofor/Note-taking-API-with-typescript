import Joi from "joi";

// Schema for validating category creation
export const categoryValidationSchema = Joi.object({
  name: Joi.string().required().min(2).max(50).trim().messages({
    "string.base": "Name must be a string",
    "string.empty": "Name is required",
    "string.min": "Name must be at least {#limit} characters long",
    "string.max": "Name cannot exceed {#limit} characters",
    "any.required": "Name is required",
  }),
  description: Joi.string().required().min(10).max(500).trim().messages({
    "string.base": "Description must be a string",
    "string.empty": "Description is required",
    "string.min": "Description must be at least {#limit} characters long",
    "string.max": "Description cannot exceed {#limit} characters",
    "any.required": "Description is required",
  }),
});

// Schema for validating category ID
export const idParamSchema = Joi.object({
  id: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      "string.base": "ID must be a string",
      "string.pattern.base": "ID must be a valid MongoDB ObjectId",
      "any.required": "ID is required",
    }),
});
