"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateMiddleware = validateMiddleware;
const mongoose_1 = require("mongoose");
function validateMiddleware(note) {
    if (!note.title || typeof note.title !== "string") {
        throw new Error("Invalid title: Title must be a string.");
    }
    if (!note.content || typeof note.content !== "string") {
        throw new Error("Invalid content: Content must be a string.");
    }
    if (!note.category) {
        throw new Error("Invalid category: Category is required.");
    }
    // ✅ Case 1: category is a valid ObjectId
    if (note.category instanceof mongoose_1.Types.ObjectId) {
        return;
    }
    // ✅ Case 2: category is a string and a valid ObjectId
    if (typeof note.category === "string" &&
        mongoose_1.Types.ObjectId.isValid(note.category)) {
        return;
    }
    // ✅ Case 3: category is an object with `name` and `description`
    if (typeof note.category === "object" &&
        "name" in note.category &&
        "description" in note.category &&
        typeof note.category.name === "string" &&
        typeof note.category.description === "string") {
        return;
    }
    // ❌ If none of the above cases match, throw an error
    throw new Error("Invalid category: Must be a valid ObjectId, a valid ObjectId string, or an object with name and description.");
}
