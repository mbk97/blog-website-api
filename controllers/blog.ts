import express, { Request, Response } from "express";

const getBlogs = (req: Request, res: Response) => {
  res.status(200).json({ message: "I am a get request" });
};

const createBlog = (req: Request, res: Response) => {
  res.status(200).json({ message: "I am a post request" });
};

const updateBlog = (req: Request, res: Response) => {
  res.status(200).json({ message: "I am a update request" });
};

const deleteBlog = (req: Request, res: Response) => {
  res.status(200).json({ message: "I am a delete request" });
};

export { getBlogs, createBlog, updateBlog, deleteBlog };
