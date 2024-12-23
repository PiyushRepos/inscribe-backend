import asyncHandler from "../utils/asyncHandler.js";
import { validatePostSchema } from "../utils/validateSchema.js";
import Post from "../models/post.models.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import mongoose from "mongoose";
import uploadOnCloudinary from "../utils/cloudinary.js";
import { nanoid } from "nanoid";

const createPost = asyncHandler(async (req, res) => {
  const { error, value } = validatePostSchema.validate(req.body);

  if (error) {
    const errors = error.details.map((err) => err.message.replace(/\"/g, ""));
    throw new ApiError(400, "Post validation failed", errors);
  }

  let thumbnailurl = null;
  if (req.file) {
    try {
      const localPath = req.file.path;
      const result = await uploadOnCloudinary(localPath);
      thumbnailurl = result.url;
    } catch (error) {
      console.log(error);
    }
  }

  try {
    const newPost = new Post({
      ...value,
      slug: value.title.replace(/\s+/g, "-") + "-" + nanoid(5),
      author: req.user._id,
      thumbnail: thumbnailurl || "",
    });
    await newPost.save();

    let loggedInUser = req.user;
    loggedInUser.posts.push(newPost._id);
    await loggedInUser.save();

    res
      .status(201)
      .json(
        new ApiResponse(201, "Post created successfully", { post: newPost })
      );
  } catch (error) {
    console.log(error);
    throw new ApiError(500, "Error while creating post", error);
  }
});

const updatePost = asyncHandler(async (req, res) => {
  const { title, summary, content, tags, thumbnail } = req.body;
  let post = req.post;

  if ((tags && !Array.isArray(tags)) || tags?.length > 5) {
    throw new ApiError(
      400,
      "A post can have a maximum of 5 tags and tags must be an array of strings."
    );
  }

  if (tags && tags.some((tag) => !tag.trim()))
    throw new ApiError(400, "Tags can not be empty.");

  let thumbnailurl = null;
  if (req.file) {
    try {
      const localPath = req.file.path;
      const result = await uploadOnCloudinary(localPath);
      thumbnailurl = result.url;
    } catch (error) {
      console.log(error);
    }
  }

  // Update the post fields, only if provided
  post.title = title || post.title;
  post.summary = summary || post.summary;
  post.content = content || post.content;
  post.tags = tags || post.tags;
  post.thumbnail = thumbnailurl || post.thumbnail;

  const updatedPost = await post.save();

  res
    .status(200)
    .send(
      new ApiResponse(200, "Post updated successfully.", { post: updatedPost })
    );
});

const deletePost = asyncHandler(async (req, res) => {
  await Post.findByIdAndDelete(req.post._id);

  res.status(200).json(new ApiResponse(200, "Post deleted successfully"));
});

const getAllPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find({}).populate("author");

  res.status(200).json(new ApiResponse(200, "All post retrieved.", { posts }));
});

const getPost = asyncHandler(async (req, res) => {
  const id = req.params?.id;

  // Check if the provided ID is valid
  if (!mongoose.Types.ObjectId.isValid(id))
    throw new ApiError(400, "Invalid post ID.");

  const post = await Post.findById(id).populate("author");

  if (!post) throw new ApiError(404, "Post not found.");

  res
    .status(200)
    .json(new ApiResponse(200, "Post fetched successfully", { post }));
});

const uploadImage = asyncHandler(async (req, res) => {
  if (req.file) {
    const result = await uploadOnCloudinary(req.file.path);
    res.status(200).json({
      url: result.url,
    });
  } else {
    res.status(400).json({ message: "no image file provided", file: req.file });
  }
});

const getPostsBySearch = asyncHandler(async (req, res) => {
  const { q } = req.query;
  const posts = await Post.find({
    $or: [
      { title: { $regex: q, $options: "i" } },
      { summary: { $regex: q, $options: "i" } },
      { content: { $regex: q, $options: "i" } },
      { tags: { $in: q.split(" ") } },
    ],
  }).populate("author");

  res
    .status(200)
    .json(new ApiResponse(200, "Posts retrieved successfully", { posts }));
});

export {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPost,
  uploadImage,
  getPostsBySearch,
};
