import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/user.js";
import cloudinary from "../config/cloudinary.js";

import multer from "multer";

// ✅ Set up Multer storage (optional, Cloudinary handles storage)
const storage = multer.memoryStorage();
const upload = multer({ storage });

export const register = async (req, res) => {
  try {
    const { name, email, password, userRole } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, userRole });
    await newUser.save();

    // Generate a token
    const token = jwt.sign({ id: newUser._id, userRole: newUser.userRole }, process.env.JWT_SECRET, {
      expiresIn: "7d", // Token expires in 7 days
    });

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        userRole: newUser.userRole,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};


// User Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.userRole }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.status(200).json({ token, user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
export const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // Exclude passwords for security
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error });
  }
};
export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id; // Get user ID from request params
    const user = await User.findById(userId).select("-password"); // Exclude password

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      name: user.name,
      email: user.email,
      profilePic: user.profilePic || "https://res.cloudinary.com/ddfhybgob/image/upload/v1742391970/pr_fdqujg.avif",
      userRole: user.userRole,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userIdToDelete = req.params.id;
    const loggedInUser = req.user.id; // The ID of the logged-in user from the token

    // Check if the logged-in user has admin privileges or is trying to delete their own account
    if (req.user.role !== 'admin' && loggedInUser !== userIdToDelete) {
      return res.status(403).json({ message: "Unauthorized to delete this user" });
    }

    const user = await User.findByIdAndDelete(userIdToDelete);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};


// ✅ Upload Profile Picture
export const uploadProfilePic = async (req, res) => {
  try {
    console.log("Received upload request..."); // ✅ Log request start
    console.log("Request User:", req.user); // ✅ Check if user is available

    if (!req.user || !req.user.id) { // ✅ Prevent `Cannot read properties of null`
      console.error("Authentication failed: No user found in request");
      return res.status(401).json({ message: "Unauthorized: No user found" });
    }

    if (!req.file) {
      console.error("No file uploaded");
      return res.status(400).json({ message: "No file uploaded" });
    }

    console.log("Uploading to Cloudinary...");
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "ProfilePictures",
      public_id: `user_${req.user.id}`,
    });

    console.log("Cloudinary Upload Successful:", result);

    const user = await User.findById(req.user.id);
    if (!user) {
      console.error("User not found");
      return res.status(404).json({ message: "User not found" });
    }

    user.profilePic = result.secure_url;
    await user.save();

    res.status(200).json({ message: "Profile picture updated", profilePic: user.profilePic });
  } catch (error) {
    console.error("Error uploading profile picture:", error);
    res.status(500).json({ message: "Error uploading profile picture", error: error.message });
  }
};

