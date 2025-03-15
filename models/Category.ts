import { Schema, model, Document, Types } from "mongoose";

export interface Category extends Document {
  _id: Types.ObjectId;
  name: string;
  description: String;
}

const categorySchema = new Schema<Category>({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const Category = model<Category>("Category", categorySchema);
export default Category;
