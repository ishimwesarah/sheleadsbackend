import mongoose from "mongoose";

const SessionSchema = new mongoose.Schema(
  {
    mentee: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // Link to the user who booked
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor", required: true }, // Link to mentor
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, default: "Upcoming" }, // Status: Upcoming, Completed, Cancelled
  },
  { timestamps: true }
);

export default mongoose.model("Session", SessionSchema);
