"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRouter = void 0;
const blog_1 = require("../controllers/blog");
const express_1 = require("express");
const auth_1 = require("../middlewares/auth");
const blogRouter = (0, express_1.Router)();
exports.blogRouter = blogRouter;
// Access:Private
blogRouter.get("/", auth_1.protect, blog_1.getBlogs);
blogRouter.get("/:id", auth_1.protect, blog_1.getSingleBlog);
// Access:Private
blogRouter.post("/", auth_1.protect, blog_1.createBlog);
// Access:Private
blogRouter.delete("/:id", auth_1.protect, blog_1.deleteBlog);
// Access:Private
blogRouter.put("/:id", auth_1.protect, blog_1.updateBlog);
//# sourceMappingURL=blogRoutes.js.map