"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const noteSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    category: { type: mongoose_1.Schema.Types.Mixed, ref: "Category", required: true },
}, { timestamps: true });
const Note = (0, mongoose_1.model)("Note", noteSchema);
exports.default = Note;
