import {
  updateBlog,
  getBlogs,
  createBlog,
  deleteBlog,
  getSingleBlog,
} from "../controllers/blog";
import { Router } from "express";
import { protect } from "../middlewares/auth";

const blogRouter = Router();
// Access:Private
blogRouter.get("/", protect, getBlogs);

blogRouter.get("/:id", protect, getSingleBlog);

// Access:Private
blogRouter.post("/", protect, createBlog);

// Access:Private
blogRouter.delete("/:id", protect, deleteBlog);

// Access:Private
blogRouter.put("/:id", protect, updateBlog);

export { blogRouter };
