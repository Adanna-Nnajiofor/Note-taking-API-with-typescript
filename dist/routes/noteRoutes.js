"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const noteController_1 = require("../controllers/noteController");
const validateMiddleware_1 = require("../middleware/validateMiddleware");
const router = express_1.default.Router();
router.get("/", validateMiddleware_1.validateMiddleware, noteController_1.getNotes);
router.get("/category/:categoryId", validateMiddleware_1.validateMiddleware, noteController_1.getNotesByCategoryController);
router.get("/:id", validateMiddleware_1.validateMiddleware, noteController_1.getNote);
router.post("/", validateMiddleware_1.validateMiddleware, noteController_1.createNote);
router.put("/:id", validateMiddleware_1.validateMiddleware, noteController_1.updateNote);
router.delete("/:id", validateMiddleware_1.validateMiddleware, noteController_1.deleteNote);
exports.default = router;
