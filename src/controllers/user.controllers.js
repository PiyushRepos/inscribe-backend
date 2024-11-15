import User from "../models/user.models.js";
import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, firstName, bio, lastName } = req.body;
  const user = await User.findOne({ $or: [{ username }, { email }] });

  if (user) throw new ApiError(409, "user already exists");

  const profileImageLocalPath = req.file;
  console.log(profileImageLocalPath);

  let nanoid = "";
  for (let i = 1; i <= 4; i++) {
    nanoid += Math.floor(Math.random() * 10);
  }

  const newUser = await new User({
    ...req.body,
    username: username || firstName + nanoid,
    bio: bio || null,
    profileImage: profileImageLocalPath.path,
    role: "user",
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, "user registered successfully.", { user: newUser })
    );
});

export { registerUser };
