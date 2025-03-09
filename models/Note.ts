import { Schema, model, InferSchemaType } from "mongoose";

const noteSchema = new Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

type INote = InferSchemaType<typeof noteSchema>;

const Note = model<INote>("Note", noteSchema);
export default Note;
