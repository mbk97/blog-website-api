"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const blogRoutes_1 = require("./routes/blogRoutes");
const db_1 = require("./config/db");
const userRoutes_1 = require("./routes/userRoutes");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
(0, db_1.connectDB)();
const app = (0, express_1.default)();
const port = process.env.PORT || 5000;
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: "*",
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use("/api/blog", blogRoutes_1.blogRouter);
app.use("/api/user", userRoutes_1.userRouter);
app.listen(port, () => console.log(`Running on port ${port}`));
//# sourceMappingURL=index.js.map