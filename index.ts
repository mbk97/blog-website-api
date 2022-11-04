import express, { Express } from "express";
import dotenv from "dotenv";
import { blogRouter } from "./routes/blogRoutes";
import { connectDB } from "./config/db";

dotenv.config();
connectDB();

const app: Express = express();
const port = process.env.PORT || 5000;

app.use("/api/blog", blogRouter);
app.listen(port, () => console.log(`Running on port ${port}`));
