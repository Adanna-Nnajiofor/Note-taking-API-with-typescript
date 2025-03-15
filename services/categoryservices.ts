import mongoose from "mongoose";
import Category from "../models/Category";

export const getAllCategories = async () => {
  try {
    return await Category.find();
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    throw error;
  }
};

export const getCategoryById = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error("❌ Invalid ObjectId:", id);
    return null;
  }
  return await Category.findById(id);
};

export const createNewCategory = async (name: string, description: string) => {
  try {
    if (!name || !description) {
      console.error("❌ Name and description are required for category.");
      return null;
    }

    const category = new Category({ name, description });
    return await category.save();
  } catch (error) {
    console.error("❌ Error creating category:", error);
    throw error;
  }
};

export const updateCategoryById = async (
  id: string,
  name?: string,
  description?: string
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      console.error("❌ Invalid ObjectId:", id);
      return null;
    }

    const updateData: Record<string, any> = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;

    return await Category.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
  } catch (error) {
    console.error("❌ Error updating category:", error);
    throw error;
  }
};

export const deleteCategoryById = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error("❌ Invalid ObjectId:", id);
    return null;
  }
  return await Category.findByIdAndDelete(id);
};
