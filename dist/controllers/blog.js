"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSingleBlog = exports.deleteBlog = exports.updateBlog = exports.createBlog = exports.getBlogs = void 0;
const userModel_1 = __importDefault(require("../model/userModel"));
const blogModel_1 = __importDefault(require("../model/blogModel"));
const getBlogs = async (req, res) => {
    const blogs = await blogModel_1.default.find({ user: req.user.id });
    res.status(200).json({ blogs: blogs });
};
exports.getBlogs = getBlogs;
const createBlog = async (req, res) => {
    if (!req.body.title) {
        res.status(400).json({ message: "Please add a title" });
        return;
    }
    if (!req.body.description) {
        res.status(400).json({ message: "Please add a description" });
        return;
    }
    try {
        const newBlog = await blogModel_1.default.create({
            title: req.body.title,
            description: req.body.description,
            user: req.user.id,
        });
        res.status(200).json({
            message: "New post created",
            newBlog,
        });
    }
    catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};
exports.createBlog = createBlog;
const updateBlog = async (req, res) => {
    const blogID = await blogModel_1.default.findById(req.params.id);
    if (!blogID) {
        res.status(400).json({ message: "Post not found!!!" });
    }
    const user = await userModel_1.default.findById(req.user.id);
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
        const updatedBlog = await blogModel_1.default.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
        });
        res.status(200).json({ message: "Blog updated successfully", updatedBlog });
    }
    catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};
exports.updateBlog = updateBlog;
const getSingleBlog = async (req, res) => {
    const blogID = await blogModel_1.default.findById(req.params.id);
    if (!blogID) {
        res.status(400).json({
            message: "Post not found!!!",
        });
        return;
    }
    const user = await userModel_1.default.findById(req.user.id);
    // make sure the loggedin user matches the goal user
    if (blogID.user.toString() !== user.id) {
        res.status(401).json({
            message: "User not found",
        });
        return;
    }
    try {
        const singleData = await blogModel_1.default.findById(req.params.id);
        res.status(200).json({ singleData, message: "single blog post" });
    }
    catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};
exports.getSingleBlog = getSingleBlog;
const deleteBlog = async (req, res) => {
    const blogID = await blogModel_1.default.findById(req.params.id);
    if (!blogID) {
        res.status(400).json({ message: "Post not found!!!" });
    }
    const user = await userModel_1.default.findById(req.user.id);
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
        await blogModel_1.default.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Blog deleted successfully" });
    }
    catch (error) {
        res.status(400).json({
            message: error,
        });
    }
};
exports.deleteBlog = deleteBlog;
//# sourceMappingURL=blog.js.map