import express from "express";
import { addMentor, getMentors, updateMentorPic, deleteMentor } from "../Controllers/mentorController.js";
import upload from "../middleware/uploadMiddleware.js";

const mentorrouter = express.Router();

mentorrouter.post("/addmentor", upload.single("image"), addMentor); // ✅ Upload Mentor Profile
mentorrouter.put("/update-pic/:id", upload.single("image"), updateMentorPic); // ✅ Update Profile Pic
mentorrouter.get("/getmentor", getMentors); // ✅ Get All Mentors
mentorrouter.delete("/deletementor/:id", deleteMentor); // ✅ Delete Mentor

export default mentorrouter;
