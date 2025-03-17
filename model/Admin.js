import mongoose from "mongoose";

const AdminSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "" }, // Profile Picture
    role: { type: String, default: "admin" },
    allowRegistration: { type: Boolean, default: true }, // Platform setting
  },
  { timestamps: true }
);

export default mongoose.model("Admin", AdminSchema);
