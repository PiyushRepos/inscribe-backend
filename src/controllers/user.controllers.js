import User from "../models/user.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { validateUserSchema } from "../utils/validateSchema.js";
import uploadOnCloudinary from "../utils/cloudinary.js";
import generateAccessAndRefreshToken from "../utils/generateAccessAndRefreshToken.js";
import { config } from "../config.js";

const registerUser = asyncHandler(async (req, res) => {
  // Validate the user input
  const result = validateUserSchema.validate(req.body);
  if (result.error) {
    const errors = result.error.details.map((err) =>
      err.message.replaceAll(`\"`, "")
    );
    throw new ApiError(400, "User validation failed", errors);
  }

  const { username, email, firstName, bio, lastName } = req.body;

  // Check for duplicate username or email
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) throw new ApiError(409, "User already exists");

  // Handle profile image upload
  const profileImageLocalPath = req.file?.path;
  let profileImageUrl = null;
  if (profileImageLocalPath) {
    try {
      const response = await uploadOnCloudinary(profileImageLocalPath);
      profileImageUrl = response.url;
    } catch (error) {
      throw new ApiError(500, "Failed to upload profile image");
    }
  }

  // Generating a unique username
  let uniqueUsername = username || firstName;
  let nanoid = "";
  for (let i = 1; i <= 4; i++) {
    nanoid += Math.floor(Math.random() * 10);
  }
  uniqueUsername += nanoid;

  // Ensuring that username is unique
  while (await User.findOne({ username: uniqueUsername })) {
    nanoid = "";
    for (let i = 1; i <= 4; i++) {
      nanoid += Math.floor(Math.random() * 10);
    }
    uniqueUsername = (username || firstName) + nanoid;
  }

  // Create a new user
  const newUser = new User({
    ...req.body,
    username: uniqueUsername,
    fullName: lastName ? `${firstName} ${lastName}` : firstName,
    bio: bio || null,
    profileImage: profileImageUrl,
    role: "user", // Prevent role escalation
  });

  const savedUser = await newUser.save();
  const userResponse = savedUser.toObject();
  delete userResponse.password;

  // Sending response
  return res.status(201).json(
    new ApiResponse(201, "User registered successfully.", {
      user: userResponse,
    })
  );
});

const loginUser = asyncHandler(async (req, res) => {
  // Validate the user input
  const { email, username, password } = req.body;
  if (!(email || username))
    throw new ApiError(400, "Username or email is required");

  // Check that user already exists or not
  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (!existingUser) throw new ApiError(400, "User does not exist");

  // Check if password is provided or not
  if (!password) throw new ApiError(400, "Password is required");

  // Comparing user provided password with hashed password
  const isPasswordCorrect = await existingUser.comparePassword(password);
  if (!isPasswordCorrect) throw new ApiError(400, "Invalid password");

  // Generate access and refresh token
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    existingUser.id
  );

  // options for cookies
  const options = {
    httpOnly: true,
    secure: config.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  };

  // Get updated user: refresh token updated or added
  let loggedInUser = await User.findById(existingUser._id).select(
    "-password -refreshToken -__v"
  );

  // Sending response
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, { ...options, maxAge: undefined })
    .json(
      new ApiResponse(200, "User logged in", {
        user: loggedInUser,
        accessToken,
        refreshToken,
      })
    );
});

export { registerUser, loginUser };
