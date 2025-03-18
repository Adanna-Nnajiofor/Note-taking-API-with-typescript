"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.noteValidationSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const categoryValidation_1 = require("./categoryValidation");
exports.noteValidationSchema = joi_1.default.object({
    title: joi_1.default.string().required().messages({
        "string.empty": "Title is required",
    }),
    content: joi_1.default.string().required().messages({
        "string.empty": "Content is required",
    }),
    category: joi_1.default.alternatives()
        .try(categoryValidation_1.idParamSchema.extract("id"), // Validate category as an ObjectId
    categoryValidation_1.categoryValidationSchema // OR validate as a full category object
    )
        .required()
        .messages({
        "any.required": "Category is required",
        "string.pattern.base": "Category ID must be a valid MongoDB ObjectId",
    }),
    user: joi_1.default.string()
        .regex(/^[0-9a-fA-F]{24}$/) // Ensure user is a valid ObjectId
        .required()
        .messages({
        "string.empty": "User ID is required",
        "string.pattern.base": "User ID must be a valid MongoDB ObjectId",
    }),
});
