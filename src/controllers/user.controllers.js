import User from "../models/user.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { validateUserSchema } from "../utils/validateSchema.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

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

export { registerUser };
