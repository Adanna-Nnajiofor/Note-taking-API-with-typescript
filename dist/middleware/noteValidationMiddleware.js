"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNote = void 0;
const noteValidation_1 = require("../validations/noteValidation");
const validateNote = (req, res, next) => {
    const { error, value } = noteValidation_1.noteValidationSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
    });
    if (error) {
        res.status(400).json({
            success: false,
            errors: error.details.map((detail) => detail.message),
        });
        return;
    }
    req.body = value;
    next();
};
exports.validateNote = validateNote;
