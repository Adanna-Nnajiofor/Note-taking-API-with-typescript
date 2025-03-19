"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateIdParam = void 0;
const categoryValidation_1 = require("../validations/categoryValidation");
const validateIdParam = (req, res, next) => {
    const { error } = categoryValidation_1.idParamSchema.validate({ id: req.params.id });
    if (error) {
        return res.status(400).json({
            success: false,
            message: error.details[0].message,
        });
    }
    next(); // Continue to the next middleware
};
exports.validateIdParam = validateIdParam;
