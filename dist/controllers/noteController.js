"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNote = exports.updateNote = exports.createNote = exports.getNotesByCategoryHandler = exports.getNote = exports.getNotes = void 0;
const noteService_1 = require("../services/noteService");
/**
 * Utility function for sending error responses
 */
const sendErrorResponse = (res, status, message) => {
    return res.status(status).json({ success: false, message });
};
/**
 * Wrapper to handle async route functions & pass errors to next()
 */
const handleRequest = (fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((error) => {
            console.error("Error: ", error);
            next(error);
        });
    };
};
/**
 * Get all notes for the authenticated user
 */
exports.getNotes = handleRequest((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.user._id)
        return sendErrorResponse(res, 401, "Unauthorized");
    const notes = yield (0, noteService_1.getAllNotes)(req.user._id);
    return res.status(200).json({ success: true, notes });
}));
/**
 * Get a single note by ID
 */
exports.getNote = handleRequest((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.user._id)
        return sendErrorResponse(res, 401, "Unauthorized");
    const noteId = req.params.id;
    if (!noteId)
        return sendErrorResponse(res, 400, "Note ID is required");
    const note = yield (0, noteService_1.getNoteById)(noteId, req.user._id);
    if (!note)
        return sendErrorResponse(res, 404, "Note not found");
    return res.status(200).json({ success: true, note });
}));
/**
 * Get notes by category for authenticated user
 */
exports.getNotesByCategoryHandler = handleRequest((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.user._id)
        return sendErrorResponse(res, 401, "Unauthorized");
    const categoryId = req.params.categoryId;
    if (!categoryId)
        return sendErrorResponse(res, 400, "Category ID is required");
    const notes = yield (0, noteService_1.getNotesByCategory)(categoryId, req.user._id);
    return res.status(200).json({ success: true, notes });
}));
/**
 * Create a new note
 */
exports.createNote = handleRequest((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.user._id)
        return sendErrorResponse(res, 401, "Unauthorized");
    const { title, content, category } = req.body;
    if (!title || !content || !category)
        return sendErrorResponse(res, 400, "Title, content, and category are required");
    const newNote = yield (0, noteService_1.createNewNote)(title, content, category, req.user._id);
    return res.status(201).json({ success: true, note: newNote });
}));
/**
 * Update an existing note
 */
exports.updateNote = handleRequest((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.user._id)
        return sendErrorResponse(res, 401, "Unauthorized");
    const noteId = req.params.id;
    if (!noteId)
        return sendErrorResponse(res, 400, "Note ID is required");
    const { title, content, category } = req.body;
    if (!title && !content && !category)
        return sendErrorResponse(res, 400, "At least one field is required for update");
    const updatedNote = yield (0, noteService_1.updateExistingNote)(noteId, req.user._id, title, content, category);
    if (!updatedNote)
        return sendErrorResponse(res, 404, "Note not found or unauthorized");
    return res.status(200).json({ success: true, note: updatedNote });
}));
/**
 * Delete a note
 */
exports.deleteNote = handleRequest((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.user._id)
        return sendErrorResponse(res, 401, "Unauthorized");
    const noteId = req.params.id;
    if (!noteId)
        return sendErrorResponse(res, 400, "Note ID is required");
    const deletedNote = yield (0, noteService_1.deleteNoteById)(noteId, req.user._id);
    if (!deletedNote)
        return sendErrorResponse(res, 404, "Note not found or unauthorized");
    return res
        .status(200)
        .json({ success: true, message: "Note deleted successfully" });
}));
