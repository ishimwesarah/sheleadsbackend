import Blog from "../model/Blog.js";
import cloudinary from "../config/cloudinary.js";

// ✅ Get all blogs
export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error });
  }
};

// ✅ Get a single blog by ID
export const getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog", error });
  }
};

// ✅ Create a new blog with multiple images
export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Title and content are required!" });
    }

    // ✅ Fix: Ensure images are extracted correctly
    const imageUrls = req.files ? req.files.map((file) => file.path) : [];

    const newBlog = new Blog({
      title,
      content,
      images: imageUrls, // Save Cloudinary URLs
    });

    await newBlog.save();
    res.status(201).json({ message: "Blog created successfully", blog: newBlog });
  } catch (error) {
    console.error("Error creating blog:", error);
    res.status(500).json({ message: "Error creating blog", error });
  }
};

// ✅ Update a blog
export const updateBlog = async (req, res) => {
  try {
    const { title, content } = req.body;
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (req.files && req.files.length > 0) {
      // ✅ Delete previous images from Cloudinary
      for (let img of blog.images) {
        const publicId = img.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`BlogImages/${publicId}`);
      }

      // ✅ Upload new images
      const imageUploadPromises = req.files.map((file) =>
        cloudinary.uploader.upload(file.path, { folder: "BlogImages" })
      );
      const imageResults = await Promise.all(imageUploadPromises);
      blog.images = imageResults.map((result) => result.secure_url);
    }

    blog.title = title;
    blog.content = content;
    await blog.save();

    res.status(200).json({ message: "Blog updated successfully", blog });
  } catch (error) {
    res.status(500).json({ message: "Error updating blog", error });
  }
};

// ✅ Delete a blog
export const deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // ✅ Delete images from Cloudinary
    for (let img of blog.images) {
      const publicId = img.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(`BlogImages/${publicId}`);
    }

    await blog.deleteOne();
    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog", error });
  }
};
