import { Request, Response, NextFunction } from "express";
import {
  getAllNotes,
  getNoteById,
  createNewNote,
  updateExistingNote,
  getNotesByCategory,
  deleteNoteById,
} from "../services/noteService";
import { validateMiddleware } from "../middleware/validateMiddleware";
import { validateNoteInput } from "../validations/noteValidation";
import { loggerMiddleware } from "../middleware/loggerMiddleware";

// Get all notes
export const getNotes = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const notes = await getAllNotes();
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

// Get a single note by ID
export const getNote = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const note = await getNoteById(req.params.id);
    if (!note) {
      res.status(404).json({ message: "Note not found" });
      return;
    }
    res.status(200).json(note);
  } catch (error) {
    next(error);
  }
};

// Get notes by category
export const getNotesByCategoryController = async (
  req: Request<{ categoryId: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { categoryId } = req.params;

    // Validate categoryId format
    if (!categoryId.match(/^[0-9a-fA-F]{24}$/)) {
      res.status(400).json({ message: "Invalid category ID format" });
      return;
    }

    const notes = await getNotesByCategory(categoryId);
    res.status(200).json(notes);
  } catch (error) {
    next(error);
  }
};

// Create a new note
export const createNote = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    loggerMiddleware(req, res, next);

    // Validate request body using Joi
    const { error } = validateNoteInput(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    // Validate data structure using custom validation
    validateMiddleware(req.body);

    // Extract fields correctly
    const { title, content, category } = req.body;

    // Create the new note
    const newNote = await createNewNote(title, content, category);
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

// Update an existing note
export const updateNote = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    loggerMiddleware(req, res, next);

    // Validate request body using Joi
    const { error } = validateNoteInput(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    // Validate data structure using custom validation
    validateMiddleware(req.body);

    // Extract fields correctly
    const { title, content, category } = req.body;

    // Update note
    const updatedNote = await updateExistingNote(
      req.params.id,
      title,
      content,
      category
    );

    if (!updatedNote) {
      res.status(404).json({ message: "Note not found" });
      return;
    }
    res.status(200).json(updatedNote);
  } catch (error) {
    next(error);
  }
};

// Delete a note
export const deleteNote = async (
  req: Request<{ id: string }>,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    loggerMiddleware(req, res, next);

    const deletedNote = await deleteNoteById(req.params.id);
    if (!deletedNote) {
      res.status(404).json({ message: "Note not found" });
      return;
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    next(error);
  }
};
