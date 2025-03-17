import { Schema, model, Document, Types } from "mongoose";
import { Category } from "./Category";

export interface Note extends Document {
  _id: Types.ObjectId;
  title: string;
  content: string;
  category: Types.ObjectId | Category;
  user: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new Schema<Note>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Note = model<Note>("Note", noteSchema);
export default Note;
