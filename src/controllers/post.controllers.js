import asyncHandler from "../utils/asyncHandler.js";
import { validatePostSchema } from "../utils/validateSchema.js";
import Post from "../models/post.models.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

const createPost = asyncHandler(async (req, res) => {
  const result = validatePostSchema.validate(req.body);
  if (result.error) {
    const errors = result.error.details.map((err) =>
      err.message.replace(/\"/g, "")
    );
    throw new ApiError(400, "Post validation failed", errors);
  }

  if (!req.user || !req.user._id) {
    throw new ApiError(401, "Unauthorized: User not authenticated");
  }

  try {
    const newPost = new Post({
      ...value,
      author: req.user._id,
    });

    await newPost.save();

    res
      .status(201)
      .json(
        new ApiResponse(201, "Post created successfully", { post: newPost })
      );
  } catch (err) {
    if (err.name === "ValidationError") {
      throw new ApiError(400, "Database validation failed", err.errors);
    }
    throw new ApiError(
      500,
      "An unexpected error occurred while creating the post."
    );
  }
});
