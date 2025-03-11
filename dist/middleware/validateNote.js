"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNote = validateNote;
const mongoose_1 = require("mongoose");
function validateNote(note) {
    if (!note.title || typeof note.title !== "string") {
        throw new Error("Invalid title: Title must be a string.");
    }
    if (!note.content || typeof note.content !== "string") {
        throw new Error("Invalid content: Content must be a string.");
    }
    if (!note.category ||
        (!(note.category instanceof mongoose_1.Types.ObjectId) &&
            (typeof note.category !== "object" ||
                !("_id" in note.category) ||
                !("name" in note.category)))) {
        throw new Error("Invalid category: Category must be an ObjectId or an object with _id and name.");
    }
}
