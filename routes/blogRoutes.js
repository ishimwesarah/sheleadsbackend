import express from "express";
import { createBlog, getBlogs, getBlogById, deleteBlog, updateBlog } from "../Controllers/blogController.js";
import {protect} from "../middleware/authMiddleware.js";
import upload, { uploadImages } from "../middleware/uploadMiddleware.js";

const blogrouter = express.Router();

blogrouter.post("/createBlog", protect, uploadImages, createBlog); // ✅ Admin creates a blog
blogrouter.get("/getBlog", getBlogs); // ✅ Public can view all blogs
blogrouter.get("/getBlogById/:id", getBlogById); // ✅ Public can view a single blog
blogrouter.put("/updateBlog/:id", protect, uploadImages, updateBlog);
blogrouter.delete("/delete/:id", protect, deleteBlog); // ✅ Admin deletes a blog

export default blogrouter;
