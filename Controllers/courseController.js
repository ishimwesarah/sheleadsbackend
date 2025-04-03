import Course from "../model/course.js";

/** ✅ CREATE A NEW COURSE */
export const createCourse = async (req, res) => {
  try {
    const { title, description, instructor, duration, pdfUrl, videoUrl } = req.body;

    // Extract uploaded files if they exist
    const image = req.files?.image ? req.files.image[0].path : "";
    const pdf = req.files?.pdf ? req.files.pdf[0].path : "";
    const video = req.files?.video ? req.files.video[0].path : "";

    const newCourse = new Course({
      title,
      description,
      instructor,
      duration,
      image,   // Cloudinary Image URL
      pdf: pdf || pdfUrl,  // Use uploaded file or provided URL
      video: video || videoUrl,  // Use uploaded file or YouTube URL
    });

    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ message: "Error creating course", error });
  }
};

/** ✅ UPDATE A COURSE */
export const updateCourse = async (req, res) => {
  try {
    const { title, description, instructor, duration, pdfUrl, videoUrl } = req.body;

    // Extract new file uploads
    const image = req.files?.image ? req.files.image[0].path : undefined;
    const pdf = req.files?.pdf ? req.files.pdf[0].path : undefined;
    const video = req.files?.video ? req.files.video[0].path : undefined;

    const updatedCourse = await Course.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        instructor,
        duration,
        ...(image && { image }),   // Update if new file is uploaded
        pdf: pdf || pdfUrl,        // Keep existing if no new upload
        video: video || videoUrl,  // Keep existing if no new upload
      },
      { new: true }
    );

    if (!updatedCourse) return res.status(404).json({ message: "Course not found" });

    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ message: "Error updating course", error });
  }
};

/** ✅ GET ALL COURSES */
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: "Error fetching courses", error });
  }
};

/** ✅ GET A SINGLE COURSE BY ID */
export const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: "Error fetching course", error });
  }
};

/** ✅ DELETE A COURSE */
export const deleteCourse = async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) return res.status(404).json({ message: "Course not found" });
    res.status(200).json({ message: "Course deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting course", error });
  }
};
