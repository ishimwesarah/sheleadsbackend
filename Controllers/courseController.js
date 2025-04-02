import Course from "../model/course.js";

// Create a new course


// Create a new course with PDF and YouTube URL
export const createCourse = async (req, res) => {
  try {
    const { title, description, instructor, duration, pdfUrl, videoUrl } = req.body;

    // Create a new course with the provided data
    const newCourse = new Course({
      title,
      description,
      instructor,
      duration,
      pdfUrl,      // PDF URL passed in the body
      videoUrl,    // YouTube URL passed in the body
      image: req.file?.path || "", // Cloudinary URL for image (if any)
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: "Error creating course", error });
  }
};

// Update a course with PDF and YouTube URL
export const updateCourse = async (req, res) => {
  try {
    const { pdfUrl, videoUrl } = req.body; // Get the PDF and video URL from the request body

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        pdfUrl,  // Update PDF URL
        videoUrl, // Update YouTube URL
      },
      { new: true }
    );

    if (!updatedCourse) return res.status(404).json({ message: "Course not found" });

    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: "Error updating course", error });
  }
};

// Existing functions for get, delete, etc.


// Get all courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
};

// Get a single course by ID
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Error fetching course", error });
  }
};

// Update a course


// Delete a course
export const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) return res.status(404).json({ message: "Course not found" });
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting course", error });
  }
};
export const uploadCourseImage = async (req, res) => {
  try {
    const { title, description, instructor, duration } = req.body;

    const newCourse = new Course({
      title,
      description,
      instructor,
      duration,
      image: req.file.path, // Cloudinary URL
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: "Error adding course", error });
  }
};
