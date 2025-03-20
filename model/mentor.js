import mongoose from "mongoose";

const MentorSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    expertise: { type: String, required: true },
    bio: { type: String },
    availability: { type: Boolean, default: true }, // Available or not
    availableDays: [{ type: String }], // ["Monday", "Wednesday"]
    availableTime: { type: String }, // "10:00 AM - 3:00 PM"
    profilePic: { type: String, default: "" }, // Cloudinary URL
  },
  { timestamps: true }
);

export default mongoose.model("Mentor", MentorSchema);
