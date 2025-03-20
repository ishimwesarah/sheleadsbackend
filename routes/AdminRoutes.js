import express from "express";
import { getAdminDetails, updateAdminProfile, changeAdminPassword, updateSettings } from "../Controllers/AdminController.js";
import { protect } from "../middleware/authMiddleware.js";

const adminrouter = express.Router();

adminrouter.get("/details", protect, getAdminDetails);
adminrouter.put("/update", protect, updateAdminProfile);
adminrouter.put("/change-password", protect, changeAdminPassword);
adminrouter.put("/settings", protect, updateSettings);

export default adminrouter;
