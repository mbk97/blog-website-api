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

/**
 * @swagger
 * tags:
 *   name: Blogs
 *   description: Blog management endpoints
 */

/**
 * @swagger
 * /api/blog:
 *   get:
 *     summary: Get all blogs
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched blogs
 */
blogRouter.get("/", protect, getBlogs);

/**
 * @swagger
 * /api/blog/{id}:
 *   get:
 *     summary: Get a single blog
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Successfully fetched blog
 *       404:
 *         description: Blog not found
 */
blogRouter.get("/:id", protect, getSingleBlog);

/**
 * @swagger
 * /api/blog:
 *   post:
 *     summary: Create a blog
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Blog created successfully
 */
blogRouter.post("/", protect, createBlog);

/**
 * @swagger
 * /api/blog/{id}:
 *   put:
 *     summary: Update a blog
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: Blog updated successfully
 */
blogRouter.put("/:id", protect, updateBlog);

/**
 * @swagger
 * /api/blog/{id}:
 *   delete:
 *     summary: Delete a blog
 *     tags: [Blogs]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Blog ID
 *     responses:
 *       200:
 *         description: Blog deleted successfully
 */
blogRouter.delete("/:id", protect, deleteBlog);

export { blogRouter };
