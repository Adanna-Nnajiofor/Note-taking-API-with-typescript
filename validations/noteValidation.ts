import Joi from "joi";
import mongoose, { Types } from "mongoose";

const noteValidationSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  category: Joi.alternatives()
    .try(
      // ✅ Case 1: Valid ObjectId as a string
      Joi.string().regex(/^[0-9a-fA-F]{24}$/),

      // ✅ Case 2: Valid Mongoose ObjectId instance
      Joi.custom((value, helpers) => {
        if (value instanceof Types.ObjectId) return value;
        if (typeof value === "string" && mongoose.isValidObjectId(value))
          return value;
        if (
          typeof value === "object" &&
          value !== null &&
          "_id" in value &&
          mongoose.isValidObjectId(value._id)
        ) {
          return value;
        }
        return helpers.error("any.invalid", {
          message:
            "Invalid category: Must be a valid ObjectId, string, or object with _id",
        });
      }),

      // ✅ Case 3: Fully embedded category object
      Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
      })
    )
    .required(),
});

export const validateNoteInput = (note: any) => {
  return noteValidationSchema.validate(note, { allowUnknown: true });
};
