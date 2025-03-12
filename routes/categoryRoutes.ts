import express, { Request, Response } from "express";
import { Category } from "../models/Category";

const router = express.Router();

// 📌 Create a New Category (Supports Embedded & Reference)
router.post("/", async (req: Request, res: Response): Promise<void> => {
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
    const err = error as Error;
    res.status(500).json({ success: false, message: err.message });
  }
});

// 📌 Get All Categories
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find();
    res.status(200).json({ success: true, data: categories });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, message: err.message });
  }
});

// 📌 Get a Single Category by ID
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      res.status(404).json({ success: false, message: "Category not found" });
      return;
    }
    res.status(200).json({ success: true, data: category });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ success: false, message: err.message });
  }
});


// 📌 Update a Category by ID (Supports Partial Updates)
router.put("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description } = req.body;

    if (!name && !description) {
      res.status(400).json({ success: false, message: "At least one field (name or description) is required" });
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
    const err = error as Error;
    res.status(500).json({ success: false, message: err.message });
  }
});


// 📌 Delete a Category by ID
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
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
    const err = error as Error;
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
