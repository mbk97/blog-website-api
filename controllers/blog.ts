import express, { Request, Response } from "express";
import Blog from "../model/blogModel";

const getBlogs = async (req: Request, res: Response) => {
  const blogs = await Blog.find();
  res.status(200).json({ blogs: blogs });
};

const createBlog = async (req: Request, res: Response) => {
  if (!req.body.title) {
    res.status(400).json({ message: "Please add a title" });
    return;
  }
  if (!req.body.description) {
    res.status(400).json({ message: "Please add a description" });
    return;
  }

  try {
    const newBlog = await Blog.create({
      title: req.body.title,
      description: req.body.description,
    });

    res.status(200).json({
      message: "New post created",
      newBlog,
    });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

const updateBlog = async (req: Request, res: Response) => {
  const blogID = await Blog.findById(req.params.id);

  if (!blogID) {
    res.status(400).json({ message: "Post not found!!!" });
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json({ message: "Blog updated successfully", updatedBlog });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

const deleteBlog = async (req: Request, res: Response) => {
  const blogID = await Blog.findById(req.params.id);

  if (!blogID) {
    res.status(400).json({ message: "Post not found!!!" });
  }

  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

export { getBlogs, createBlog, updateBlog, deleteBlog };
