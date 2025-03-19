"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
// Joi schema for validating MongoDB ObjectId (24-character hex string)
const objectIdSchema = joi_1.default.string().hex().length(24).required().messages({
    "string.empty": "{#label} is required",
    "string.hex": "{#label} must be a valid MongoDB ObjectId",
    "string.length": "{#label} must be exactly 24 characters long",
});
// Note validation schema
exports.noteValidationSchema = joi_1.default.object({
    title: joi_1.default.string().required().messages({
        "string.empty": "Title is required",
    }),
    content: joi_1.default.string().required().messages({
        "string.empty": "Content is required",
    }),
    category: objectIdSchema.label("Category ID"), // Valid MongoDB ObjectId
    user: objectIdSchema.label("User ID"), // Valid MongoDB ObjectId
});
