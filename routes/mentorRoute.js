import express from "express";
import { addMentor, getMentors, getMentorById, updateMentor, deleteMentor, uploadMentorPic  } from "../controllers/mentorController.js";
import upload from "../middleware/uploadMiddleware.js";

const mentorrouter = express.Router();

mentorrouter.post("/add", addMentor); // ✅ Add mentor
mentorrouter.get("/getmentor", getMentors); // ✅ Get all mentors
mentorrouter.get("/getmentor/:id", getMentorById); // ✅ Get single mentor
mentorrouter.put("/update/:id", updateMentor); // ✅ Update mentor
mentorrouter.delete("/delete/:id", deleteMentor); // ✅ Delete mentor
mentorrouter.put("/upload-mentor/:id", upload.single("image"), uploadMentorPic)

export default mentorrouter;
