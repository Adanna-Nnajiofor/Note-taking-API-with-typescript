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
exports.deleteNote = exports.createNote = exports.getNote = exports.getNotes = void 0;
const Note_1 = require("../models/Note");
// Get all notes
const getNotes = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notes = yield Note_1.Note.find();
        res.status(200).json(notes);
    }
    catch (error) {
        next(error);
    }
});
exports.getNotes = getNotes;
// Get a single note
const getNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const noteId = req.params.id;
        const note = yield Note_1.Note.findById(noteId);
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
        const { title, content } = req.body;
        if (!title || !content) {
            res.status(400).json({ message: "Title and content are required" });
            return;
        }
        const newNote = new Note_1.Note({ title, content });
        yield newNote.save();
        res.status(201).json(newNote);
    }
    catch (error) {
        next(error);
    }
});
exports.createNote = createNote;
// Delete a note
const deleteNote = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const noteId = req.params.id;
        const note = yield Note_1.Note.findByIdAndDelete(noteId);
        if (!note) {
            res.status(404).json({ message: "Note not found" });
            return;
        }
        res.status(200).json({ message: `Note ${noteId} deleted successfully` });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteNote = deleteNote;
