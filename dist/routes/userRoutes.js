"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const user_1 = require("../controllers/user");
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const userRouter = (0, express_1.Router)();
exports.userRouter = userRouter;
userRouter.post("/login", user_1.loginUser);
userRouter.post("/register", user_1.registerUser);
userRouter.post("/forgot-password", user_1.forgotPassword);
// userRouter.post("/reset-password", resetPassword);
userRouter.get("/getme", auth_1.protect, user_1.getUserDetail);
//# sourceMappingURL=userRoutes.js.map