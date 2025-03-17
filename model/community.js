import mongoose from "mongoose";

const CommunitySchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Use ObjectId for user reference
    userName: { type: String, required: true },
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
