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
      idParamSchema.extract("id"), //  Use the category ID validation
      categoryValidationSchema //  Use the full category object validation
    )
    .required()
    .messages({
      "any.required": "Category is required",
    }),
  user: Joi.string().required().messages({
    "string.empty": "User ID is required",
  }),
});
