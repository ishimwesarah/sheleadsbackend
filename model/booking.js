import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    mentor: { type: mongoose.Schema.Types.ObjectId, ref: "Mentor", required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    status: { type: String, default: "Pending" }, // Pending, Confirmed, etc.
  },
  { timestamps: true }
);

export default mongoose.model("Booking", BookingSchema);
