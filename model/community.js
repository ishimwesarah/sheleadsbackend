import mongoose from "mongoose";

const communityPostSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  userName: { type: String, required: true },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }], // Users who liked
  replies: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      userName: String,
      text: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
});

const CommunityPost = mongoose.model("CommunityPost", communityPostSchema);

export default CommunityPost;
