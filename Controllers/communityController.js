import CommunityPost from "../model/community.js";
import User from "../model/user.js";

// Create a new community post
export const createPost = async (req, res) => {
  try {
    const { content } = req.body;
    const user = await User.findById(req.user.id); // Get user from DB

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newPost = new CommunityPost({
      userId: user._id,
      userName: user.name,
      content,
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
};

// Fetch all posts
export const getPosts = async (req, res) => {
  try {
    const posts = await CommunityPost.find().populate("userId", "name email"); // Populate user details
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: "Error fetching posts", error });
  }
};
// Get a single post by ID
export const getPostById = async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Error fetching post", error });
  }
};

// Delete a post
export const deletePost = async (req, res) => {
  try {
    const deletedPost = await CommunityPost.findByIdAndDelete(req.params.id);
    if (!deletedPost) return res.status(404).json({ message: "Post not found" });
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting post", error });
  }
};
