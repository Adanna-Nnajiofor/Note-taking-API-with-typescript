import { Response, NextFunction } from "express";
import {
  getAllNotes,
  getNoteById,
  createNewNote,
  updateExistingNote,
  deleteNoteById,
  getNotesByCategory,
} from "../services/noteService";
import { AuthRequest } from "../interfaces/Auth";

/**
 * Utility function for sending error responses
 */
const sendErrorResponse = (res: Response, status: number, message: string) => {
  return res.status(status).json({ success: false, message });
};

/**
 * Wrapper to handle async route functions & pass errors to next()
 */
const handleRequest = <T extends AuthRequest>(
  fn: (req: T, res: Response, next: NextFunction) => Promise<Response | void>
) => {
  return (req: T, res: Response, next: NextFunction) => {
    fn(req, res, next).catch((error) => {
      console.error("Error: ", error);
      next(error);
    });
  };
};

/**
 * Get all notes for the authenticated user
 */
export const getNotes = handleRequest(async (req, res) => {
  if (!req.user || !req.user._id)
    return sendErrorResponse(res, 401, "Unauthorized");

  const notes = await getAllNotes(req.user._id);
  return res.status(200).json({ success: true, notes });
});

/**
 * Get a single note by ID
 */
export const getNote = handleRequest(async (req, res) => {
  if (!req.user || !req.user._id)
    return sendErrorResponse(res, 401, "Unauthorized");

  const noteId = req.params.id;
  if (!noteId) return sendErrorResponse(res, 400, "Note ID is required");

  const note = await getNoteById(noteId, req.user._id);
  if (!note) return sendErrorResponse(res, 404, "Note not found");

  return res.status(200).json({ success: true, note });
});

/**
 * Get notes by category for authenticated user
 */
export const getNotesByCategoryHandler = handleRequest(async (req, res) => {
  if (!req.user || !req.user._id)
    return sendErrorResponse(res, 401, "Unauthorized");

  const categoryId = req.params.categoryId;
  if (!categoryId)
    return sendErrorResponse(res, 400, "Category ID is required");

  const notes = await getNotesByCategory(categoryId, req.user._id);
  return res.status(200).json({ success: true, notes });
});

/**
 * Create a new note
 */
export const createNote = handleRequest(async (req, res) => {
  if (!req.user || !req.user._id)
    return sendErrorResponse(res, 401, "Unauthorized");

  const { title, content, category } = req.body;
  if (!title || !content || !category)
    return sendErrorResponse(
      res,
      400,
      "Title, content, and category are required"
    );

  const newNote = await createNewNote(title, content, category, req.user._id);
  return res.status(201).json({ success: true, note: newNote });
});

/**
 * Update an existing note
 */
export const updateNote = handleRequest(async (req, res) => {
  if (!req.user || !req.user._id)
    return sendErrorResponse(res, 401, "Unauthorized");

  const noteId = req.params.id;
  if (!noteId) return sendErrorResponse(res, 400, "Note ID is required");

  const { title, content, category } = req.body;
  if (!title && !content && !category)
    return sendErrorResponse(
      res,
      400,
      "At least one field is required for update"
    );

  const updatedNote = await updateExistingNote(
    noteId,
    req.user._id,
    title,
    content,
    category
  );
  if (!updatedNote)
    return sendErrorResponse(res, 404, "Note not found or unauthorized");

  return res.status(200).json({ success: true, note: updatedNote });
});

/**
 * Delete a note
 */
export const deleteNote = handleRequest(async (req, res) => {
  if (!req.user || !req.user._id)
    return sendErrorResponse(res, 401, "Unauthorized");

  const noteId = req.params.id;
  if (!noteId) return sendErrorResponse(res, 400, "Note ID is required");

  const deletedNote = await deleteNoteById(noteId, req.user._id);
  if (!deletedNote)
    return sendErrorResponse(res, 404, "Note not found or unauthorized");

  return res
    .status(200)
    .json({ success: true, message: "Note deleted successfully" });
});
