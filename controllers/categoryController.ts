import { Request, Response, NextFunction } from "express";
import Category from "../models/Category";

// 📌 Create a New Category
export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      res
        .status(400)
        .json({ success: false, message: "Name and description are required" });
      return;
    }
    const category = new Category({ name, description });
    await category.save();
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

// 📌 Get All Categories
export const getAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

// 📌 Get a Single Category by ID
export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404).json({ success: false, message: "Category not found" });
      return;
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

// 📌 Update a Category by ID
export const updateCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, description } = req.body;
    if (!name && !description) {
      res.status(400).json({
        success: false,
        message: "At least one field (name or description) is required",
      });
      return;
    }
    const updateData: Record<string, any> = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;

    const category = await Category.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true, runValidators: true }
    );
    if (!category) {
      res.status(404).json({ success: false, message: "Category not found" });
      return;
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

// 📌 Delete a Category by ID
export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      res.status(404).json({ success: false, message: "Category not found" });
      return;
    }
    res
      .status(200)
      .json({ success: true, message: "Category deleted successfully" });
  } catch (error) {
    next(error);
  }
};
