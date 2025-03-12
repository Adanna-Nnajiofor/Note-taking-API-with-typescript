import { Schema, model, Document, Types } from "mongoose";
import { Category } from "./Category";

export interface Note extends Document {
  _id: Types.ObjectId;
  title: string;
  content: string;
  category: Types.ObjectId | Category;
  createdAt: Date;
  updatedAt: Date;
}

const noteSchema = new Schema<Note>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },

    // ✅ Category can be an ObjectId reference or an embedded object
    category: {
      type: Schema.Types.Mixed,
      required: true,
      validate: {
        validator: (value: any) => {
          return (
            Types.ObjectId.isValid(value) ||
            (typeof value === "object" && value.name && value.description)
          );
        },
        message:
          "Invalid category: Must be a valid ObjectId or an object with 'name' and 'description'.",
      },
    },
  },
  { timestamps: true }
);

const Note = model<Note>("Note", noteSchema);
export default Note;
