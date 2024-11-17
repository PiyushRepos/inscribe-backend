import asyncHandler from "../utils/asyncHandler.js";
import { validatePostSchema } from "../utils/validateSchema.js";
import Post from "../models/post.models.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";

const createPost = asyncHandler(async (req, res) => {
  const { error, value } = validatePostSchema.validate(req.body);
  if (error) {
    const errors = error.details.map((err) => err.message.replace(/\"/g, ""));
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
  } catch (error) {
    throw new ApiError(500, "Error while creating post", error);
  }
});

const updatePost = asyncHandler(async (req, res) => {
  const { title, subtitle, content, tags } = req.body;
  let post = req.post;

  if ((tags && !Array.isArray(tags)) || tags?.length > 5) {
    throw new ApiError(
      400,
      "A post can have a maximum of 5 tags and tags must be an array of strings."
    );
  }

  if (tags && tags.some((tag) => !tag.trim()))
    throw new ApiError(400, "Tags can not be empty.");

  // Update the post fields, only if provided
  post.title = title || post.title;
  post.subtitle = subtitle || post.subtitle;
  post.content = content || post.content;
  post.tags = tags || post.tags;

  const updatedPost = await post.save();

  res
    .status(200)
    .send(
      new ApiResponse(200, "Post updated successfully.", { post: updatedPost })
    );
});

export { createPost, updatePost };
