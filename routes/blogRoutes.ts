import {
  updateBlog,
  getBlogs,
  createBlog,
  deleteBlog,
} from "../controllers/blog";
import { Router } from "express";

const blogRouter = Router();
// Access:Private
blogRouter.get("/", getBlogs);

// Access:Private
blogRouter.post("/", createBlog);

// Access:Private
blogRouter.delete("/:id", deleteBlog);

// Access:Private
blogRouter.put("/:id", updateBlog);

export { blogRouter };
