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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getAllCategories = exports.createCategory = void 0;
const Category_1 = __importDefault(require("../models/Category"));
// 📌 Create a New Category
const createCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, description } = req.body;
        if (!name || !description) {
            res
                .status(400)
                .json({ success: false, message: "Name and description are required" });
            return;
        }
        const category = new Category_1.default({ name, description });
        yield category.save();
        res.status(201).json({ success: true, data: category });
    }
    catch (error) {
        next(error);
    }
});
exports.createCategory = createCategory;
// 📌 Get All Categories
const getAllCategories = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Category_1.default.find();
        res.status(200).json({ success: true, data: categories });
    }
    catch (error) {
        next(error);
    }
});
exports.getAllCategories = getAllCategories;
// 📌 Get a Single Category by ID
const getCategoryById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category_1.default.findById(req.params.id);
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
exports.getCategoryById = getCategoryById;
// 📌 Update a Category by ID
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
        const updateData = {};
        if (name)
            updateData.name = name;
        if (description)
            updateData.description = description;
        const category = yield Category_1.default.findByIdAndUpdate(req.params.id, { $set: updateData }, { new: true, runValidators: true });
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
// 📌 Delete a Category by ID
const deleteCategory = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category_1.default.findByIdAndDelete(req.params.id);
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
