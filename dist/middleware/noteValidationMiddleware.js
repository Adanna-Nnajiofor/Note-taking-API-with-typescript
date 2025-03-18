"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNote = void 0;
const noteValidation_1 = require("../validations/noteValidation");
const validateNote = (req, res, next) => {
    var _a, _b, _c, _d;
    // Ensure user is a string
    req.body.user =
        ((_b = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id) === null || _b === void 0 ? void 0 : _b.toString()) || ((_d = (_c = req.user) === null || _c === void 0 ? void 0 : _c.userId) === null || _d === void 0 ? void 0 : _d.toString()) || "";
    const { error, value } = noteValidation_1.noteValidationSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: true,
    });
    if (error) {
        res.status(400).json({
            success: false,
            errors: error.details.map((detail) => ({
                field: detail.path.join("."),
                message: detail.message,
            })),
        });
        return;
    }
    req.body = value;
    next();
};
exports.validateNote = validateNote;
