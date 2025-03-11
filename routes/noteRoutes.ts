import express from "express";
import {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
  getNotesByCategoryController,
} from "../controllers/noteController";
import { validateMiddleware } from "../middleware/validateMiddleware";

const router = express.Router();

router.get("/", validateMiddleware, getNotes);
router.get(
  "/category/:categoryId",
  validateMiddleware,
  getNotesByCategoryController
);
router.get("/:id", validateMiddleware, getNote);
router.post("/", validateMiddleware, createNote);
router.put("/:id", validateMiddleware, updateNote);
router.delete("/:id", validateMiddleware, deleteNote);

export default router;
