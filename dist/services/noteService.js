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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteNoteById = exports.updateExistingNote = exports.createNewNote = exports.getNotesByCategory = exports.getNoteById = exports.getAllNotes = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Note_1 = __importDefault(require("../models/Note"));
/**
 * Fetch all notes for a specific user.
 */
const getAllNotes = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Note_1.default.find({ user: userId }).populate("category");
    }
    catch (error) {
        console.error(` Error fetching notes for user ${userId}:`, error);
        throw error;
    }
});
exports.getAllNotes = getAllNotes;
/**
 * Fetch a single note by ID and user.
 */
const getNoteById = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            console.error(` Invalid Note ID: ${id}`);
            return null;
        }
        return yield Note_1.default.findOne({ _id: id, user: userId }).populate("category");
    }
    catch (error) {
        console.error(` Error fetching note ${id}:`, error);
        throw error;
    }
});
exports.getNoteById = getNoteById;
/**
 * Fetch notes belonging to a specific category for a user.
 */
const getNotesByCategory = (categoryId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(categoryId)) {
            console.error(` Invalid Category ID: ${categoryId}`);
            return [];
        }
        return yield Note_1.default.find({ category: categoryId, user: userId }).populate("category");
    }
    catch (error) {
        console.error(` Error fetching notes for category ${categoryId}:`, error);
        throw error;
    }
});
exports.getNotesByCategory = getNotesByCategory;
/**
 * Create a new note.
 */
const createNewNote = (title, content, categoryId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!title || !content) {
            console.error(" Title and content are required.");
            return null;
        }
        if (!mongoose_1.default.Types.ObjectId.isValid(categoryId)) {
            console.error(` Invalid Category ID: ${categoryId}`);
            return null;
        }
        const newNote = new Note_1.default({
            title,
            content,
            category: categoryId,
            user: userId,
        });
        return yield newNote.save();
    }
    catch (error) {
        console.error(" Error creating new note:", error);
        throw error;
    }
});
exports.createNewNote = createNewNote;
/**
 * Update an existing note.
 */
const updateExistingNote = (id, userId, title, content, categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            console.error(` Invalid Note ID: ${id}`);
            return null;
        }
        const updateData = {};
        if (title)
            updateData.title = title;
        if (content)
            updateData.content = content;
        if (categoryId && mongoose_1.default.Types.ObjectId.isValid(categoryId)) {
            updateData.category = new mongoose_1.default.Types.ObjectId(categoryId);
        }
        const updatedNote = yield Note_1.default.findOneAndUpdate({ _id: id, user: userId }, { $set: updateData }, { new: true, runValidators: true }).populate("category");
        if (!updatedNote) {
            console.error(` Note not found or unauthorized access: ${id}`);
            return null;
        }
        return updatedNote;
    }
    catch (error) {
        console.error(` Error updating note ${id}:`, error);
        throw error;
    }
});
exports.updateExistingNote = updateExistingNote;
/**
 * Delete a note by ID.
 */
const deleteNoteById = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            console.error(` Invalid Note ID: ${id}`);
            return null;
        }
        const deletedNote = yield Note_1.default.findOneAndDelete({ _id: id, user: userId });
        if (!deletedNote) {
            console.error(` Note not found or unauthorized access: ${id}`);
            return null;
        }
        return deletedNote;
    }
    catch (error) {
        console.error(` Error deleting note ${id}:`, error);
        throw error;
    }
});
exports.deleteNoteById = deleteNoteById;
