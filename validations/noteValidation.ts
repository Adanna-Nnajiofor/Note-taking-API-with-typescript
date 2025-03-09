import Joi from "joi";

const noteSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  content: Joi.string().min(5).max(1000).required(),
});

export const validateNote = (note: any) => {
  return noteSchema.validate(note);
};
