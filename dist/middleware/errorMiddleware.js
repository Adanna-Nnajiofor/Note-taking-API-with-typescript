"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
// Custom error-handling middleware
const errorHandler = (err, req, res, next) => {
    var _a;
    console.error("Error:", err.message || err);
    // Set status code (default to 500 if not specified)
    const statusCode = (_a = err.statusCode) !== null && _a !== void 0 ? _a : 500;
    res.status(statusCode).json(Object.assign({ success: false, message: err.message || "Internal Server Error" }, (process.env.NODE_ENV === "development" && { stack: err.stack })));
};
exports.errorHandler = errorHandler;
