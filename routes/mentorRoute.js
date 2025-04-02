import express from "express";
import { addMentor, getMentors, updateMentorPic, deleteMentor, getAvailableMentors, getMentorById, updateMentorProfile } from "../Controllers/mentorController.js";
import upload from "../middleware/uploadMiddleware.js";
import { protect } from "../middleware/authMiddleware.js";
const mentorrouter = express.Router();

mentorrouter.post("/addmentor", upload.single("image"), addMentor); // ✅ Upload Mentor Profile
mentorrouter.put("/update-pic/:id", upload.single("image"), updateMentorPic); // ✅ Update Profile Pic
mentorrouter.get("/getmentor", getMentors); // ✅ Get All Mentors
mentorrouter.delete("/deletementor/:id", deleteMentor); // ✅ Delete Mentor
mentorrouter.get("/available", getAvailableMentors);
mentorrouter.get("/getmentorbyid/:id", getMentorById)
mentorrouter.put("/updateProfile", protect, upload.single("profilePic"), updateMentorProfile);
export default mentorrouter;
