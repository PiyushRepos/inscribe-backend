import User from "../models/user.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import { validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const error = validationResult(req);
  if (!error.isEmpty())
    return res
      .status(400)
      .json(new ApiError(400, "user validation failed", error.errors));

  return res
    .status(200)
    .json(
      new ApiResponse(200, "user registered successfully.", { user: req.body })
    );
});

export { registerUser };
