"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateNote = void 0;
const noteValidation_1 = require("../validations/noteValidation");
const validateNote = (req, res, next) => {
    var _a, _b;
    try {
        // Ensure the user is authenticated
        if (!req.user || (!req.user._id && !req.user.userId)) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized: User ID is missing",
            });
        }
        // Convert user ID to string and assign it to req.body
        req.body.user = ((_a = req.user._id) === null || _a === void 0 ? void 0 : _a.toString()) || ((_b = req.user.userId) === null || _b === void 0 ? void 0 : _b.toString());
        // Validate request body
        const { error, value } = noteValidation_1.noteValidationSchema.validate(req.body, {
            abortEarly: false, // Show all validation errors at once
            stripUnknown: true, // Remove unknown fields
        });
        if (error) {
            return res.status(400).json({
                success: false,
                errors: error.details.map((detail) => ({
                    field: detail.path.join("."),
                    message: detail.message,
                })),
            });
        }
        req.body = value; // Assign validated data
        next();
    }
    catch (err) {
        console.error("Validation Error:", err);
        return res.status(500).json({
            success: false,
            message: "Internal server error during validation",
        });
    }
};
exports.validateNote = validateNote;
