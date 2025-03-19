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
exports.deleteCategoryById = exports.updateCategoryById = exports.createNewCategory = exports.getCategoryById = exports.getAllCategories = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Category_1 = __importDefault(require("../models/Category"));
// Get All Categories
const getAllCategories = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield Category_1.default.find();
    }
    catch (error) {
        console.error("Error fetching categories:", error);
        throw new Error("Could not fetch categories");
    }
});
exports.getAllCategories = getAllCategories;
// Get Category by ID
const getCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        console.error("Invalid ObjectId:", id);
        throw new Error("Invalid category ID");
    }
    return yield Category_1.default.findById(id);
});
exports.getCategoryById = getCategoryById;
// Create New Category
const createNewCategory = (name, description) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = new Category_1.default({ name, description });
        return yield category.save();
    }
    catch (error) {
        console.error("Error creating category:", error);
        throw new Error("Could not create category");
    }
});
exports.createNewCategory = createNewCategory;
// Update Category by ID
const updateCategoryById = (id, name, description) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
            throw new Error("Invalid category ID");
        }
        const updateData = {};
        if (name)
            updateData.name = name;
        if (description)
            updateData.description = description;
        const category = yield Category_1.default.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true });
        if (!category) {
            throw new Error("Category not found");
        }
        return category;
    }
    catch (error) {
        console.error("Error updating category:", error);
        throw new Error("Could not update category");
    }
});
exports.updateCategoryById = updateCategoryById;
// Delete Category by ID
const deleteCategoryById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    if (!mongoose_1.default.Types.ObjectId.isValid(id)) {
        throw new Error("Invalid category ID");
    }
    const category = yield Category_1.default.findByIdAndDelete(id);
    if (!category) {
        throw new Error("Category not found");
    }
    return category;
});
exports.deleteCategoryById = deleteCategoryById;
