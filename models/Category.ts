import { Schema, model, Document, Types } from "mongoose";

export interface Category extends Document {
  _id: Types.ObjectId;
  name: string;
}

const categorySchema = new Schema<Category>({
  name: { type: String, required: true },
});

export const Category = model<Category>("Category", categorySchema);
