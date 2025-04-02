import express from "express";
import { register, login, getUsers,deleteUser, uploadProfilePic, getUserById, updateUserRole } from "../Controllers/authController.js";
import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
import multer from "multer";


const authrouter = express.Router();

// User Registration
authrouter.post("/register", register);

// User Login
authrouter.post("/login", login);
authrouter.get("/getUser", getUsers);
authrouter.put("/upload-profile", protect, upload.single("image"), uploadProfilePic);
authrouter.get("/getUser/:id", getUserById);
authrouter.delete("/deleteUser/:id", deleteUser);
authrouter.put("/updateRole/:id", updateUserRole);
export default authrouter;
