"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNoteInput = void 0;
const joi_1 = __importDefault(require("joi"));
const noteValidationSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    content: joi_1.default.string().required(),
    //   category: Joi.string().required(),
    category: joi_1.default.string()
        .regex(/^[0-9a-fA-F]{24}$/)
        .required(),
});
const validateNoteInput = (note) => {
    return noteValidationSchema.validate(note, { allowUnknown: true });
};
exports.validateNoteInput = validateNoteInput;
