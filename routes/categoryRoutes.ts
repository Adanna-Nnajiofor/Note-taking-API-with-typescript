import express from "express";
import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController";
import { validateCategory } from "../middleware/categoryValidationMiddleware";
import { validateIdParam } from "../middleware/idCategoryValidation";

const router = express.Router();

// Category Routes
router.post("/", validateCategory, createCategory);
router.get("/", getAllCategories);
router.get("/:id", validateIdParam, getCategoryById);
router.put("/:id", validateIdParam, validateCategory, updateCategory);
router.delete("/:id", validateIdParam, deleteCategory);

export default router;
