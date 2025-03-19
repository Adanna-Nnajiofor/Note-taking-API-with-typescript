import { Request, Response, NextFunction } from "express";
import {
  getAllCategories,
  getCategoryById,
  createNewCategory,
  updateCategoryById,
  deleteCategoryById,
} from "../services/categoryService";

// Create a New Category
export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { name, description } = req.body;
    const category = await createNewCategory(name, description);
    if (!category) {
      res
        .status(400)
        .json({ success: false, message: "Invalid category data" });
      return;
    }
    res.status(201).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

// Get All Categories
export const fetchAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const categories = await getAllCategories();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    next(error);
  }
};

// Get a Single Category by ID
export const fetchCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const category = await getCategoryById(req.params.id);
    if (!category) {
      res.status(404).json({ success: false, message: "Category not found" });
      return;
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

// Update a Category by ID
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

    const category = await updateCategoryById(req.params.id, name, description);
    if (!category) {
      res.status(404).json({ success: false, message: "Category not found" });
      return;
    }

    res.status(200).json({ success: true, data: category });
  } catch (error) {
    next(error);
  }
};

// Delete a Category by ID
export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const category = await deleteCategoryById(req.params.id);
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
