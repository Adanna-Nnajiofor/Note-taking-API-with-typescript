import express from "express";
import {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/noteController";
import { validateNote } from "../middleware/noteValidationMiddleware"; // ✅ Import validation middleware

const router = express.Router();

router.get("/", getNotes);
router.get("/:id", getNote);
router.post("/", validateNote, createNote); // ✅ Validate before creating a note
router.put("/:id", validateNote, updateNote); // ✅ Validate before updating a note
router.delete("/:id", deleteNote); // No validation needed for DELETE

export default router;
