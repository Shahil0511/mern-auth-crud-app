import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Ensure this references the correct User model
      required: true,
    },
  },
  {
    timestamps: true, // Optional: add createdAt and updatedAt timestamps
  }
);

const Post = mongoose.model("Post", postSchema);

export default Post;
