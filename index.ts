import express, { Express } from "express";
import dotenv from "dotenv";
import { blogRouter } from "./routes/blogRoutes";
import { connectDB } from "./config/db";
import { userRouter } from "./routes/userRoutes";
import cors from "cors";

dotenv.config();
connectDB();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: "*",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/blog", blogRouter);
app.use("/api/user", userRouter);
app.listen(port, () => console.log(`Running on port ${port}`));
