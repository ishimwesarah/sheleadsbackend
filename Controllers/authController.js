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

    // Ensure req.user exists
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized: No user logged in" });
    }

    // Ensure only admin can delete users
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied. Only admins can delete users." });
    }

    // Find the user to delete
    const user = await User.findById(userIdToDelete);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Delete user
    await User.findByIdAndDelete(userIdToDelete);
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Error deleting user", error: error.message });
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
// Update User Role
export const updateUserRole = async (req, res) => {
  try {
    const userId = req.params.id; // Get user ID from request params
    const { userRole } = req.body; // The new role

    // Find the user to update
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update the user's role
    user.userRole = userRole;
    await user.save();

    res.status(200).json({ message: "User role updated successfully", user });
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ message: "Error updating user role", error });
  }
};

