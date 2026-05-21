import express, { Express } from "express";
import dotenv from "dotenv";
import { blogRouter } from "./routes/blogRoutes";
import { connectDB } from "./config/db";
import { userRouter } from "./routes/userRoutes";
import cors from "cors";
import morgan from "morgan";
import logger from "./utility/logger";

dotenv.config();
connectDB();

const app: Express = express();
const port = process.env.PORT || 5000;

console.log("Environment variables:", {
  MONGODB_URI: process.env.MONGODB_URI,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
});

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: "*",
  })
);

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/api/blog", blogRouter);
app.use("/api/user", userRouter);

// Error middleware should be LAST
app.use((err, req, res, next) => {
  logger.error(err.stack);

  res.status(500).json({
    message: "Internal Server Error",
  });
});
app.listen(port, () => console.log(`Running on port ${port}`));
