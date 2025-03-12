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
const express_1 = __importDefault(require("express"));
const Category_1 = require("../models/Category");
const router = express_1.default.Router();
// 📌 Create a New Category
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        if (!name) {
            res.status(400).json({ success: false, message: "Name is required" });
            return;
        }
        const category = new Category_1.Category({ name });
        yield category.save();
        res.status(201).json({ success: true, data: category });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ success: false, message: err.message });
    }
}));
// 📌 Get All Categories
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Category_1.Category.find();
        res.status(200).json({ success: true, data: categories });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ success: false, message: err.message });
    }
}));
// 📌 Get a Single Category by ID
router.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category_1.Category.findById(req.params.id);
        if (!category) {
            res.status(404).json({ success: false, message: "Category not found" });
            return;
        }
        res.status(200).json({ success: true, data: category });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ success: false, message: err.message });
    }
}));
// 📌 Update a Category by ID
router.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const category = yield Category_1.Category.findByIdAndUpdate(req.params.id, { name }, { new: true, runValidators: true });
        if (!category) {
            res.status(404).json({ success: false, message: "Category not found" });
            return;
        }
        res.status(200).json({ success: true, data: category });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ success: false, message: err.message });
    }
}));
// 📌 Delete a Category by ID
router.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const category = yield Category_1.Category.findByIdAndDelete(req.params.id);
        if (!category) {
            res.status(404).json({ success: false, message: "Category not found" });
            return;
        }
        res
            .status(200)
            .json({ success: true, message: "Category deleted successfully" });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ success: false, message: err.message });
    }
}));
exports.default = router;
