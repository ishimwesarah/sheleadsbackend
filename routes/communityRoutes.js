import express from "express";
import { createPost, getPosts, getPostById, deletePost, likePost, replyPost  } from "../Controllers/communityController.js";
import { authenticateToken } from "../middleware/authemiddleware.js";

const communityrouter = express.Router();

// Create a new community post
communityrouter.post("/Createpost", authenticateToken, createPost);

// Get all community posts
communityrouter.get("/getpost", getPosts);

// Get a single post by ID
communityrouter.get("/getpost/:id", getPostById);

// Delete a post
communityrouter.delete("/delete/:id", deletePost);
communityrouter.put("/like/:id", authenticateToken, likePost); // <== New Route
communityrouter.post("/reply/:id", authenticateToken, replyPost);
export default communityrouter;
