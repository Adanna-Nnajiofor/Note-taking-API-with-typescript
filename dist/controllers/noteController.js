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
exports.deleteNote = exports.updateNote = exports.createNote = exports.getNote = exports.getNotes = void 0;
const noteService_1 = require("../services/noteService");
// Get all notes
const getNotes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield (0, noteService_1.getAllNotes)();
        res.status(200).json(notes);
    }
    catch (error) {
        next(error);
    }
});
exports.getNotes = getNotes;
// Get a single note by ID
const getNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const note = yield (0, noteService_1.getNoteById)(req.params.id);
        if (!note) {
            res.status(404).json({ message: "Note not found" });
            return;
        }
        res.status(200).json(note);
    }
    catch (error) {
        next(error);
    }
});
exports.getNote = getNote;
// Create a new note
const createNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, category } = req.body;
        const newNote = yield (0, noteService_1.createNewNote)(title, content, category);
        res.status(201).json(newNote);
    }
    catch (error) {
        next(error);
    }
});
exports.createNote = createNote;
// Update an existing note
const updateNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, content, category } = req.body;
        const updatedNote = yield (0, noteService_1.updateExistingNote)(req.params.id, title, content, category);
        if (!updatedNote) {
            res.status(404).json({ message: "Note not found" });
            return;
        }
        res.status(200).json(updatedNote);
    }
    catch (error) {
        next(error);
    }
});
exports.updateNote = updateNote;
// Delete a note
const deleteNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const deletedNote = yield (0, noteService_1.deleteNoteById)(req.params.id);
        if (!deletedNote) {
            res.status(404).json({ message: "Note not found" });
            return;
        }
        res.status(200).json({ message: "Note deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteNote = deleteNote;
