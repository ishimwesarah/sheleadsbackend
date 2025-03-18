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
    const posts = await CommunityPost.find()
  .populate("userId", "name email") // Get post owner's name
  .populate("replies.userId", "name") // Get commenter’s name
  .lean();

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
// Like a post
export const likePost = async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const userId = req.user.id; // Get user ID from the authenticated request

    // Check if the user has already liked the post
    const likedIndex = post.likedBy.indexOf(userId);

    if (likedIndex === -1) {
      // User hasn't liked it yet, so add like
      post.likedBy.push(userId);
      post.likes += 1;
    } else {
      // User already liked it, so remove like
      post.likedBy.splice(likedIndex, 1);
      post.likes -= 1;
    }

    await post.save();

    res.status(200).json({ message: "Like toggled", likes: post.likes });
  } catch (error) {
    res.status(500).json({ message: "Error toggling like", error });
  }
};
export const replyPost = async (req, res) => {
  try {
    const { text } = req.body;
    const post = await CommunityPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const user = req.user; // Get user from middleware
    if (!user) return res.status(404).json({ message: "User not found" });

    const newReply = {
      userId: user._id,
      userName: user.name,
      text,
      createdAt: new Date(),
    };

    post.replies.push(newReply);
    await post.save();

    res.status(201).json({ message: "Reply added successfully", replies: post.replies });
  } catch (error) {
    res.status(500).json({ message: "Error adding reply", error });
  }
};
