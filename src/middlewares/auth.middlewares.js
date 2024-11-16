import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import { config } from "../config.js";
import User from "../models/user.models.js";
import asyncHandler from "../utils/asyncHandler.js";

export const verifyJWTToken = asyncHandler(async (req, res, next) => {
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
