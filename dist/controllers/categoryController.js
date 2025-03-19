"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.fetchCategoryById = exports.fetchAllCategories = exports.createCategory = void 0;
const categoryServices_1 = require("../services/categoryServices");
// Create a New Category
const createCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        const category = yield (0, categoryServices_1.createNewCategory)(name, description);
        if (!category) {
            res
                .status(400)
                .json({ success: false, message: "Invalid category data" });
            return;
        }
        res.status(201).json({ success: true, data: category });
    }
    catch (error) {
        next(error);
    }
});
exports.createCategory = createCategory;
// Get All Categories
const fetchAllCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield (0, categoryServices_1.getAllCategories)();
        res.status(200).json({ success: true, data: categories });
    }
    catch (error) {
        next(error);
    }
});
exports.fetchAllCategories = fetchAllCategories;
// Get a Single Category by ID
const fetchCategoryById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield (0, categoryServices_1.getCategoryById)(req.params.id);
        if (!category) {
            res.status(404).json({ success: false, message: "Category not found" });
            return;
        }
        res.status(200).json({ success: true, data: category });
    }
    catch (error) {
        next(error);
    }
});
exports.fetchCategoryById = fetchCategoryById;
// Update a Category by ID
const updateCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        if (!name && !description) {
            res.status(400).json({
                success: false,
                message: "At least one field (name or description) is required",
            });
            return;
        }
        const category = yield (0, categoryServices_1.updateCategoryById)(req.params.id, name, description);
        if (!category) {
            res.status(404).json({ success: false, message: "Category not found" });
            return;
        }
        res.status(200).json({ success: true, data: category });
    }
    catch (error) {
        next(error);
    }
});
exports.updateCategory = updateCategory;
// Delete a Category by ID
const deleteCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield (0, categoryServices_1.deleteCategoryById)(req.params.id);
        if (!category) {
            res.status(404).json({ success: false, message: "Category not found" });
            return;
        }
        res
            .status(200)
            .json({ success: true, message: "Category deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCategory = deleteCategory;
