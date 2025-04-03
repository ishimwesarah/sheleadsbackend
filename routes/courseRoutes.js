import express from "express";
import { createCourse, getCourses, getCourseById, updateCourse, deleteCourse,   } from "../Controllers/courseController.js";
import upload from "../middleware/uploadMiddleware.js";
const router = express.Router();

// Create a new course
router.post("/createCourse", createCourse);

// Get all courses
router.get("/getCourse", getCourses);

// Get a single course by ID
router.get("/getCourseById/:id", getCourseById);

// Update a course
router.put("/updateCourseById/:id", updateCourse);

// Delete a course
router.delete("/deleteCourse/:id", deleteCourse);


export default router;
