import {
  loginUser,
  registerUser,
  getUserDetail,
  forgotPassword,
  // resetPassword,
} from "../controllers/user";
import { Router } from "express";
import { protect } from "../middlewares/auth";

const userRouter = Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.post("/forgot-password", forgotPassword);
// userRouter.post("/reset-password", resetPassword);
userRouter.get("/getme", protect, getUserDetail);

export { userRouter };
