"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCategory = void 0;
const categoryValidation_1 = require("../validations/categoryValidation");
const validateCategory = (req, res, next) => {
    const { error, value } = categoryValidation_1.categoryValidationSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
    });
    if (error) {
        return res.status(400).json({
            success: false,
            errors: error.details.map((detail) => ({
                field: detail.path.join("."), // Shows which field has the error
                message: detail.message,
            })),
        });
    }
    req.body = value;
    next(); // Continue to the next middleware
};
exports.validateCategory = validateCategory;
