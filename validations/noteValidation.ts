import Joi from "joi";
import mongoose, { Types } from "mongoose";

const noteValidationSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  category: Joi.alternatives()
    .try(
      Joi.string().regex(/^[0-9a-fA-F]{24}$/), // Valid ObjectId as a string
      Joi.custom((value, helpers) => {
        if (value instanceof Types.ObjectId) return value; // Case 1: Mongoose ObjectId instance
        if (typeof value === "string" && mongoose.isValidObjectId(value))
          return value; // Case 2: Valid string ObjectId
        if (
          typeof value === "object" &&
          value !== null &&
          "_id" in value &&
          mongoose.isValidObjectId(value._id)
        ) {
          return value; // Case 3: Object containing a valid `_id`
        }
        return helpers.error("any.invalid", {
          message:
            "Invalid category: Must be a valid ObjectId, string, or object with _id",
        });
      })
    )
    .required(),
});

export const validateNoteInput = (note: any) => {
  return noteValidationSchema.validate(note, { allowUnknown: true });
};
