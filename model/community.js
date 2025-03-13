import mongoose from "mongoose";

const CommunitySchema = new mongoose.Schema(
  {
    user: { type: String},
    content: { type: String, required: true },
    likes: { type: Number, default: 0 },
    comments: [
      {
        user: String,
        text: String,
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("CommunityPost", CommunitySchema);
