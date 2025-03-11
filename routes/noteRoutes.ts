import express from "express";
import {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
  getNotesByCategoryController,
} from "../controllers/noteController";

const router = express.Router();

router.get("/", getNotes);
router.get("/category/:categoryId", getNotesByCategoryController);
router.get("/:id", getNote);
router.post("/", createNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
