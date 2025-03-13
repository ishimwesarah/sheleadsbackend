import express from "express";
import { createPost, getPosts, getPostById, deletePost } from "../Controllers/communityController.js";

const communityrouter = express.Router();

// Create a new community post
communityrouter.post("/Createpost", createPost);

// Get all community posts
communityrouter.get("/getpost", getPosts);

// Get a single post by ID
communityrouter.get("/getpost/:id", getPostById);

// Delete a post
communityrouter.delete("/delete/:id", deletePost);

export default communityrouter;
