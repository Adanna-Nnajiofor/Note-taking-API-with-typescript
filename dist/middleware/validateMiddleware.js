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
    if (!note.category ||
        !((note.category instanceof mongoose_1.Types.ObjectId || // Case 1: category is a valid ObjectId
            (typeof note.category === "string" &&
                mongoose_1.Types.ObjectId.isValid(note.category)) || // Case 2: category is a valid string ObjectId
            (typeof note.category === "object" &&
                "id" in note.category &&
                mongoose_1.Types.ObjectId.isValid(note.category.id))) // Case 3: category is an object with a valid `id`
        )) {
        throw new Error("Invalid category: Must be a valid ObjectId, string, or Category object.");
    }
}
