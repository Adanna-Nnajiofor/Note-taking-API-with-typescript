import { Request, Response, NextFunction } from "express";
import {
  getAllNotes,
  getNoteById,
  createNewNote,
  updateExistingNote,
  deleteNoteById,
} from "../services/noteService";
import { validateNote } from "../validations/noteValidation";

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

// Create a new note
export const createNote = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Validate input
    const { error } = validateNote(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const { title, content } = req.body;
    const newNote = await createNewNote(title, content);
    res.status(201).json(newNote);
  } catch (error) {
    next(error);
  }
};

// Update an existing note
export const updateNote = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Validate input
    const { error } = validateNote(req.body);
    if (error) {
      res.status(400).json({ message: error.details[0].message });
      return;
    }

    const { title, content } = req.body;
    const updatedNote = await updateExistingNote(req.params.id, title, content);
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
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
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
