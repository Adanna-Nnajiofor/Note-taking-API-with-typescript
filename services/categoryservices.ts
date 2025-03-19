import mongoose from "mongoose";
import Category from "../models/Category";

// Get All Categories
export const getAllCategories = async () => {
  try {
    return await Category.find();
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Could not fetch categories");
  }
};

// Get Category by ID
export const getCategoryById = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    console.error("Invalid ObjectId:", id);
    throw new Error("Invalid category ID");
  }
  return await Category.findById(id);
};

// Create New Category
export const createNewCategory = async (name: string, description: string) => {
  try {
    const category = new Category({ name, description });
    return await category.save();
  } catch (error) {
    console.error("Error creating category:", error);
    throw new Error("Could not create category");
  }
};

// Update Category by ID
export const updateCategoryById = async (
  id: string,
  name?: string,
  description?: string
) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid category ID");
    }

    const updateData: Partial<{ name: string; description: string }> = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;

    const category = await Category.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!category) {
      throw new Error("Category not found");
    }

    return category;
  } catch (error) {
    console.error("Error updating category:", error);
    throw new Error("Could not update category");
  }
};

// Delete Category by ID
export const deleteCategoryById = async (id: string) => {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Invalid category ID");
  }

  const category = await Category.findByIdAndDelete(id);
  if (!category) {
    throw new Error("Category not found");
  }

  return category;
};
