import Joi from "joi";
import { idParamSchema, categoryValidationSchema } from "./categoryValidation";

export const noteValidationSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title is required",
  }),
  content: Joi.string().required().messages({
    "string.empty": "Content is required",
  }),
  category: Joi.alternatives()
    .try(
      idParamSchema.extract("id"), // Validate category as an ObjectId
      categoryValidationSchema // OR validate as a full category object
    )
    .required()
    .messages({
      "any.required": "Category is required",
      "string.pattern.base": "Category ID must be a valid MongoDB ObjectId",
    }),
  user: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/) // Ensure user is a valid ObjectId
    .required()
    .messages({
      "string.empty": "User ID is required",
      "string.pattern.base": "User ID must be a valid MongoDB ObjectId",
    }),
});
