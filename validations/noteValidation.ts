import Joi from "joi";

const noteValidationSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  content: Joi.string().min(5).max(1000).required(),
  //   category: Joi.string().required(),
  category: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

export const validateNoteInput = (note: any) => {
  return noteValidationSchema.validate(note, { allowUnknown: true });
};
