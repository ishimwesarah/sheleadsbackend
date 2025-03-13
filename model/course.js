import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    instructor: { type: String, required: true },
    duration: { type: String, required: true },
    image: { type: String }, // Optional image URL
  },
  { timestamps: true }
);

export default mongoose.model("Course", CourseSchema);
