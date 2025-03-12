"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const noteSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    // ✅ Category can be an ObjectId reference or an embedded object
    category: {
        type: mongoose_1.Schema.Types.Mixed,
        required: true,
        validate: {
            validator: (value) => {
                return (mongoose_1.Types.ObjectId.isValid(value) ||
                    (typeof value === "object" && value.name && value.description));
            },
            message: "Invalid category: Must be a valid ObjectId or an object with 'name' and 'description'.",
        },
    },
}, { timestamps: true });
const Note = (0, mongoose_1.model)("Note", noteSchema);
exports.default = Note;
