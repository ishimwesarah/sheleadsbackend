import express from "express";
import { register, login, getUsers,deleteUser, uploadProfilePic } from "../Controllers/authController.js";
import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";

const authrouter = express.Router();

// User Registration
authrouter.post("/register", register);

// User Login
authrouter.post("/login", login);
authrouter.get("/getUser", getUsers);
authrouter.put("/upload-profile/:id", protect, upload.single("image"), uploadProfilePic);
authrouter.delete("/deleteUser/:id", deleteUser);
export default authrouter;
