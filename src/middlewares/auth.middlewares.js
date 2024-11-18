import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import { config } from "../config.js";
import User from "../models/user.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import Post from "../models/post.models.js";
import mongoose from "mongoose";

export const verifyJWTToken = asyncHandler(async (req, _, next) => {
  // Extract token from cookies or Authorization header
  const token =
    req.cookies?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");

  if (!token) throw new ApiError(401, "Unauthorized. Token required.");

  try {
    // Decode the token
    const decodedToken = jwt.verify(token, config.JWT_ACCESS_TOKEN_SECRET);

    // Fetch user by decoded userId
    const user = await User.findById(decodedToken?.userId).select(
      "-password -refreshToken"
    );
    if (!user) throw new ApiError(401, "Invalid access token.");

    req.user = user; // Attach user info to the request object
    next();
  } catch (err) {
    // Handle specific JWT errors
    if (err instanceof jwt.TokenExpiredError) {
      throw new ApiError(401, "Token expired.");
    } else if (err instanceof jwt.JsonWebTokenError) {
      throw new ApiError(401, "Invalid token.");
    }

    // Default error message for other errors
    throw new ApiError(
      401,
      "Unauthorized. Token is either invalid or expired."
    );
  }
});

export const isAuthor = asyncHandler(async (req, res, next) => {
  const id = req.params?.id;

  // Check if the provided ID is valid
  if (!mongoose.Types.ObjectId.isValid(id))
    throw new ApiError(400, "Invalid post ID.");

  const post = await Post.findById(id);
  if (!post) throw new ApiError(404, "Post not found.");

  // Compare the post's author ID with the logged-in user's ID
  if (req.isAdmin) {
    req.post = post;
    return next();
  }

  if (!post.author.equals(req.user._id))
    throw new ApiError(403, "You are not authorized to modify this post.");

  req.post = post;
  return next();
});

export const isAdmin = asyncHandler(async (req, res, next) => {
  const id = req.params?.id;

  // Check if the provided ID is valid
  if (!mongoose.Types.ObjectId.isValid(id))
    throw new ApiError(400, "Invalid post ID.");

  const post = await Post.findById(id);
  if (!post) throw new ApiError(404, "Post not found.");

  // Check, if logged-in user is admin or not
  req.user.role === "admin" ? (req.isAdmin = true) : (req.isAdmin = false);

  next();
});
