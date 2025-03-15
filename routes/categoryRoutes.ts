import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController";
import { validateCategory } from "../middleware/categoryValidationMiddleware";
import { validateIdParam } from "../middleware/idCategoryValidation"; // New middleware for ID validation

const router = express.Router();

// Category Routes
router.post("/", validateCategory, createCategory); // Validate category body before creation
router.get("/", getAllCategories);
router.get("/:id", validateIdParam, getCategoryById); // Validate ID before fetching category
router.put("/:id", validateIdParam, validateCategory, updateCategory); // Validate both ID and body
router.delete("/:id", validateIdParam, deleteCategory); // Validate ID before deletion

export default router;
