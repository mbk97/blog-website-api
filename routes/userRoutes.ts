import { loginUser, registerUser, getUserDetail } from "../controllers/user";
import { Router } from "express";

const userRouter = Router();

userRouter.post("/login", loginUser);
userRouter.post("/register", registerUser);
userRouter.get("/getme", getUserDetail);

export { userRouter };
