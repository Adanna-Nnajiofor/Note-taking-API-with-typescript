import Joi from "joi";

const noteValidationSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  //   category: Joi.string().required(),
  category: Joi.string()
    .regex(/^[0-9a-fA-F]{24}$/)
    .required(),
});

export const validateNoteInput = (note: any) => {
  return noteValidationSchema.validate(note, { allowUnknown: true });
};
