"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const noteController_1 = require("../controllers/noteController");
const noteValidationMiddleware_1 = require("../middleware/noteValidationMiddleware");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.get("/", authMiddleware_1.authenticateUser, noteController_1.getNotes);
router.get("/:id", authMiddleware_1.authenticateUser, noteController_1.getNote);
router.post("/", authMiddleware_1.authenticateUser, noteValidationMiddleware_1.validateNote, noteController_1.createNote);
router.put("/:id", authMiddleware_1.authenticateUser, noteValidationMiddleware_1.validateNote, noteController_1.updateNote);
router.delete("/:id", authMiddleware_1.authenticateUser, noteController_1.deleteNote);
exports.default = router;
