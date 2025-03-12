"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNoteInput = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = __importStar(require("mongoose"));
const noteValidationSchema = joi_1.default.object({
    title: joi_1.default.string().required(),
    content: joi_1.default.string().required(),
    category: joi_1.default.alternatives()
        .try(
    // ✅ Case 1: Valid ObjectId as a string
    joi_1.default.string().regex(/^[0-9a-fA-F]{24}$/), 
    // ✅ Case 2: Valid Mongoose ObjectId instance
    joi_1.default.custom((value, helpers) => {
        if (value instanceof mongoose_1.Types.ObjectId)
            return value;
        if (typeof value === "string" && mongoose_1.default.isValidObjectId(value))
            return value;
        if (typeof value === "object" &&
            value !== null &&
            "_id" in value &&
            mongoose_1.default.isValidObjectId(value._id)) {
            return value;
        }
        return helpers.error("any.invalid", {
            message: "Invalid category: Must be a valid ObjectId, string, or object with _id",
        });
    }), 
    // ✅ Case 3: Fully embedded category object
    joi_1.default.object({
        name: joi_1.default.string().required(),
        description: joi_1.default.string().required(),
    }))
        .required(),
});
const validateNoteInput = (note) => {
    return noteValidationSchema.validate(note, { allowUnknown: true });
};
exports.validateNoteInput = validateNoteInput;
