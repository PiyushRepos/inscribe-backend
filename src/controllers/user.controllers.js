import User from "../models/user.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { validateUserSchema } from "../utils/validateSchema.js";
import uploadOnCloudinary from "../utils/cloudinary.js";

const registerUser = asyncHandler(async (req, res) => {
  const result = validateUserSchema.validate(req.body);
  if (result.error)
    throw new ApiError(400, "user validation failed", result.error?.details);
  const { username, email, firstName, bio } = req.body;

  const user = await User.findOne({ $or: [{ username }, { email }] });
  if (user) throw new ApiError(409, "user already exists");

  const profileImageLocalPath = req.file?.path;

  let response = profileImageLocalPath
    ? await uploadOnCloudinary(profileImageLocalPath)
    : null;

  let nanoid = "";
  for (let i = 1; i <= 4; i++) {
    nanoid += Math.floor(Math.random() * 10);
  }

  const newUser = await new User({
    ...req.body,
    username: username || firstName + nanoid,
    bio: bio || null,
    profileImage: response?.url || undefined,
    role: "user",
  });

  const registerUser = await newUser.save();
  const userResponse = registerUser.toObject();
  delete userResponse.password;

  return res.status(200).json(
    new ApiResponse(200, "user registered successfully.", {
      user: userResponse,
    })
  );
});

export { registerUser };
