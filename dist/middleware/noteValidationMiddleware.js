"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNote = void 0;
const noteValidation_1 = require("../validations/noteValidation");
const validateNote = (req, res, next) => {
    var _a, _b;
    req.body.user = ((_a = req.user) === null || _a === void 0 ? void 0 : _a._id) || ((_b = req.user) === null || _b === void 0 ? void 0 : _b.userId);
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
