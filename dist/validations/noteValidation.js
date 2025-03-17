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
        .try(categoryValidation_1.idParamSchema.extract("id"), //  Use the category ID validation
    categoryValidation_1.categoryValidationSchema //  Use the full category object validation
    )
        .required()
        .messages({
        "any.required": "Category is required",
    }),
    user: joi_1.default.string().required().messages({
        "string.empty": "User ID is required",
    }),
});
