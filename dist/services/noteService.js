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
exports.deleteNoteById = exports.updateExistingNote = exports.createNewNote = exports.getNoteById = exports.getAllNotes = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Note_1 = __importDefault(require("../models/Note"));
const getAllNotes = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield Note_1.default.find();
});
exports.getAllNotes = getAllNotes;
const getNoteById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield Note_1.default.findById(id);
});
exports.getNoteById = getNoteById;
const createNewNote = (title, content) => __awaiter(void 0, void 0, void 0, function* () {
    const newNote = new Note_1.default({ title, content });
    return yield newNote.save();
});
exports.createNewNote = createNewNote;
const updateExistingNote = (id, title, content) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            console.error("❌ Invalid ObjectId:", id);
            return null;
        }
        const updatedNote = yield Note_1.default.findByIdAndUpdate(id, { title, content }, { new: true, runValidators: true });
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
    return yield Note_1.default.findByIdAndDelete(id);
});
exports.deleteNoteById = deleteNoteById;
