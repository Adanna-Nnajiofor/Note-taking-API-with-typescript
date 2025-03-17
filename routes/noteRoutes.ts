import express from "express";

import {
  getNotes,
  getNote,
  createNote,
  updateNote,
  deleteNote,
} from "../controllers/noteController";
import { validateNote } from "../middleware/noteValidationMiddleware";
import { authenticateUser } from "../middleware/authMiddleware";

const router = express.Router();

router.get("/", authenticateUser, getNotes);
router.get("/:id", authenticateUser, getNote);
router.post("/", authenticateUser, validateNote, createNote);
router.put("/:id", authenticateUser, validateNote, updateNote);
router.delete("/:id", authenticateUser, deleteNote);

export default router;
