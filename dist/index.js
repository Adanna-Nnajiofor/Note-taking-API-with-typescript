"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const noteRoutes_1 = __importDefault(require("./routes/noteRoutes"));
const categoryRoutes_1 = __importDefault(require("./routes/categoryRoutes"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const errorMiddleware_1 = require("./middleware/errorMiddleware");
const loggerMiddleware_1 = require("./middleware/loggerMiddleware");
dotenv_1.default.config();
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(loggerMiddleware_1.loggerMiddleware);
// Routes
app.use("/api/notes", noteRoutes_1.default);
app.use("/api/categories", categoryRoutes_1.default);
app.use("/api/auth", authRoutes_1.default);
// Connect to MongoDB
const PORT = process.env.PORT || 5000;
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
    .catch((err) => console.log(err));
// Global Error Handler (Must be after routes)
app.use(errorMiddleware_1.errorHandler);
