import { Response } from "express";
import User from "../model/userModel";
import { IGetUserAuthInfoRequest } from "../interfaces/interface";
import Blog from "../model/blogModel";

const getBlogs = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const blogs = await Blog.find({ user: req.user.id });
  res.status(200).json({ blogs: blogs });
};

const createBlog = async (req: IGetUserAuthInfoRequest, res: Response) => {
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
      user: req.user.id,
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

const updateBlog = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const blogID = await Blog.findById(req.params.id);

  if (!blogID) {
    res.status(400).json({ message: "Post not found!!!" });
  }

  const user = await User.findById(req.user.id);

  // check for user
  if (!user) {
    res.status(401).json({
      message: "user not found",
    });
    return;
  }

  // make sure the loggedin user matches the goal user
  if (blogID.user.toString() !== user.id) {
    res.status(401).json({
      message: "User not found",
    });
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

const getSingleBlog = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const blogID = await Blog.findById(req.params.id);

  if (!blogID) {
    res.status(400).json({
      message: "Post not found!!!",
    });
    return;
  }

  const user = await User.findById(req.user.id);

  // make sure the loggedin user matches the goal user
  if (blogID.user.toString() !== user.id) {
    res.status(401).json({
      message: "User not found",
    });
    return;
  }

  try {
    const singleData = await Blog.findById(req.params.id);
    res.status(200).json({ singleData, message: "single blog post" });
  } catch (error) {
    res.status(400).json({
      message: error,
    });
  }
};

const deleteBlog = async (req: IGetUserAuthInfoRequest, res: Response) => {
  const blogID = await Blog.findById(req.params.id);

  if (!blogID) {
    res.status(400).json({ message: "Post not found!!!" });
  }

  const user = await User.findById(req.user.id);

  // check for user
  if (!user) {
    res.status(401).json({
      message: "user not found",
    });
    return;
  }

  // make sure the loggedin user matches the goal user
  if (blogID.user.toString() !== user.id) {
    res.status(401).json({
      message: "User not found",
    });
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

export { getBlogs, createBlog, updateBlog, deleteBlog, getSingleBlog };
