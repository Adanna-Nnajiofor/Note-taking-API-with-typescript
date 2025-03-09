"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNote = void 0;
const joi_1 = __importDefault(require("joi"));
const noteSchema = joi_1.default.object({
    title: joi_1.default.string().min(3).max(100).required(),
    content: joi_1.default.string().min(5).max(1000).required(),
});
const validateNote = (note) => {
    return noteSchema.validate(note);
};
exports.validateNote = validateNote;
