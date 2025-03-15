"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const noteController_1 = require("../controllers/noteController");
const noteValidationMiddleware_1 = require("../middleware/noteValidationMiddleware"); // ✅ Import validation middleware
const router = express_1.default.Router();
router.get("/", noteController_1.getNotes);
router.get("/:id", noteController_1.getNote);
router.post("/", noteValidationMiddleware_1.validateNote, noteController_1.createNote); // ✅ Validate before creating a note
router.put("/:id", noteValidationMiddleware_1.validateNote, noteController_1.updateNote); // ✅ Validate before updating a note
router.delete("/:id", noteController_1.deleteNote); // No validation needed for DELETE
exports.default = router;
