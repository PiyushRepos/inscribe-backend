import mongoose from "mongoose";

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post title is required"],
      minlength: [10, "Title should be at least 10 characters long."],
    },
    slug: {
      type: String,
      required: true,
    },
    subtitle: {
      type: String,
      minlength: [10, "Title should be at least 10 characters long."],
      default: null,
    },
    content: {
      type: String,
      required: [true, "Post content is required"],
      minlength: [10, "Content should be at least 10 characters long."],
    },
    tags: {
      type: [String],
      default: null,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);
export default Post;
