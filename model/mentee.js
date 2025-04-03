import mongoose from "mongoose";

const MenteeSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    progress: { type: Number, default: 0 }, // Percentage progress
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor" }, // Linked mentor
    sessions: [
      {
        mentor: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor" }, // Mentor ID
        date: { type: String, required: true }, // "2025-04-10"
        time: { type: String, required: true }, // "2:00 PM - 2:30 PM"
        status: { type: String, default: "Upcoming" }, // Upcoming, Completed, Cancelled
        meetingLink: { type: String }, // Zoom/Google Meet link
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Mentee", MenteeSchema);
