import { loginUser, registerUser, getUserDetail } from "../controllers/user";
import { Router } from "express";
import { protect } from "../middlewares/auth";

const userRouter = Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.get("/getme", protect, getUserDetail);

export { userRouter };
