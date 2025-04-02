import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String, default: "https://res.cloudinary.com/ddfhybgob/image/upload/v1742391970/pr_fdqujg.avif" }, // Cloudinary URL
    userRole: { type: String, default: "user", enum: ["user", "admin", "mentor"] },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
