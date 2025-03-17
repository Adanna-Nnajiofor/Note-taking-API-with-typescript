"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryController_1 = require("../controllers/categoryController");
const categoryValidationMiddleware_1 = require("../middleware/categoryValidationMiddleware");
const idCategoryValidation_1 = require("../middleware/idCategoryValidation");
const router = express_1.default.Router();
// Category Routes
router.post("/", categoryValidationMiddleware_1.validateCategory, categoryController_1.createCategory);
router.get("/", categoryController_1.getAllCategories);
router.get("/:id", idCategoryValidation_1.validateIdParam, categoryController_1.getCategoryById);
router.put("/:id", idCategoryValidation_1.validateIdParam, categoryValidationMiddleware_1.validateCategory, categoryController_1.updateCategory);
router.delete("/:id", idCategoryValidation_1.validateIdParam, categoryController_1.deleteCategory);
exports.default = router;
