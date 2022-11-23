import {
  updateBlog,
  getBlogs,
  createBlog,
  deleteBlog,
} from "../controllers/blog";
import { Router } from "express";
import { protect } from "../middlewares/auth";

const blogRouter = Router();
// Access:Private
blogRouter.get("/", protect, getBlogs);

// Access:Private
blogRouter.post("/", protect, createBlog);

// Access:Private
blogRouter.delete("/:id", protect, deleteBlog);

// Access:Private
blogRouter.put("/:id", protect, updateBlog);

export { blogRouter };
