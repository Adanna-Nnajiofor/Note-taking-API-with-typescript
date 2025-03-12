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
const getAllNotes = () => __awaiter(void 0, void 0, void 0, function* () {
    const notes = yield Note_1.default.find().populate("category");
    return notes.length > 0 ? notes : [];
});
exports.getAllNotes = getAllNotes;
const getNoteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        console.error("❌ Invalid ObjectId:", id);
        return null;
    }
    return yield Note_1.default.findById(id).populate("category");
});
exports.getNoteById = getNoteById;
const getNotesByCategory = (category) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // ✅ Check if category is an embedded object with 'name'
        if (typeof category === "object" && "name" in category) {
            return yield Note_1.default.find({ "category.name": category.name });
        }
        // ✅ If category is a valid ObjectId, search directly
        if (typeof category === "string" &&
            mongoose_1.default.Types.ObjectId.isValid(category)) {
            return yield Note_1.default.find({ category }).populate("category");
        }
        console.error("❌ Invalid category:", category);
        return [];
    }
    catch (error) {
        console.error("❌ Error fetching notes by category:", error);
        throw error;
    }
});
exports.getNotesByCategory = getNotesByCategory;
const createNewNote = (title, content, category) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let categoryData;
        if (typeof category === "string" &&
            mongoose_1.default.Types.ObjectId.isValid(category)) {
            categoryData = category;
        }
        else if (typeof category === "object" &&
            "name" in category &&
            "description" in category) {
            categoryData = category;
        }
        else {
            console.error("❌ Invalid category:", category);
            return null;
        }
        const newNote = new Note_1.default({ title, content, category: categoryData });
        return yield newNote.save();
    }
    catch (error) {
        console.error("❌ Error creating new note:", error);
        throw error;
    }
});
exports.createNewNote = createNewNote;
const updateExistingNote = (id, title, content, category) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            console.error("❌ Invalid ObjectId:", id);
            return null;
        }
        let categoryData;
        if (typeof category === "string" &&
            mongoose_1.default.Types.ObjectId.isValid(category)) {
            categoryData = category;
        }
        else if (typeof category === "object" &&
            "name" in category &&
            "description" in category) {
            categoryData = category;
        }
        else {
            console.error("❌ Invalid category:", category);
            return null;
        }
        const updatedNote = yield Note_1.default.findByIdAndUpdate(id, { title, content, category: categoryData }, { new: true, runValidators: true }).populate("category");
        if (!updatedNote) {
            console.error("❌ Note not found for ID:", id);
        }
        return updatedNote;
    }
    catch (error) {
        console.error("❌ Error updating note:", error);
        throw error;
    }
});
exports.updateExistingNote = updateExistingNote;
const deleteNoteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        console.error("❌ Invalid ObjectId:", id);
        return null;
    }
    return yield Note_1.default.findByIdAndDelete(id);
});
exports.deleteNoteById = deleteNoteById;
