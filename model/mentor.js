import mongoose from "mongoose";

const MentorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    expertise: { type: String, required: true },
    bio: { type: String },
    availability: { type: Boolean, default: true },
    profilePic: { type: String, default: "" }, // Cloudinary URL
  },
  { timestamps: true }
);

export default mongoose.model("Mentor", MentorSchema);
