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
const getAllNotes = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield Note_1.default.find({ user: userId }).populate("category");
    return notes.length > 0 ? notes : [];
});
exports.getAllNotes = getAllNotes;
const getNoteById = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        console.error(" Invalid ObjectId:", id);
        return null;
    }
    return yield Note_1.default.findOne({ _id: id, user: userId }).populate("category");
});
exports.getNoteById = getNoteById;
const getNotesByCategory = (categoryId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(categoryId)) {
            console.error(" Invalid category ID:", categoryId);
            return [];
        }
        return yield Note_1.default.find({ category: categoryId, user: userId }).populate("category");
    }
    catch (error) {
        console.error(" Error fetching notes by category:", error);
        throw error;
    }
});
exports.getNotesByCategory = getNotesByCategory;
const createNewNote = (title, content, categoryId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(categoryId)) {
            console.error(" Invalid category ID:", categoryId);
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
const updateExistingNote = (id, userId, title, content, categoryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            console.error(`Invalid ObjectId for note: ${id}`);
            return null;
        }
        const updateData = {};
        if (title)
            updateData.title = title;
        if (content)
            updateData.content = content;
        if (categoryId && mongoose_1.default.Types.ObjectId.isValid(categoryId)) {
            updateData.category = categoryId;
        }
        const updatedNote = yield Note_1.default.findOneAndUpdate({ _id: id, user: userId }, { $set: updateData }, { new: true, runValidators: true }).populate("category");
        if (!updatedNote) {
            console.error(`Note not found or user does not own it: ${id}`);
        }
        return updatedNote;
    }
    catch (error) {
        console.error(`Error updating note (ID: ${id}, User: ${userId}):`, error);
        throw error;
    }
});
exports.updateExistingNote = updateExistingNote;
const deleteNoteById = (id, userId) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        console.error(`Invalid ObjectId for note: ${id}`);
        return null;
    }
    const deletedNote = yield Note_1.default.findOneAndDelete({ _id: id, user: userId });
    if (!deletedNote) {
        console.error(`Note not found or user does not own it: ${id}`);
    }
    return deletedNote;
});
exports.deleteNoteById = deleteNoteById;
