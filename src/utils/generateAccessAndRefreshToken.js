import User from "../models/user.models.js";

const generateAccessAndRefreshToken = async (userId) => {
  const user = await User.findById(userId);

  const accessToken = await user.generateAccessToken();
  const refreshToken = await user.generateRefreshToken();

  user.refreshToken = refreshToken;

  return { accessToken, refreshToken };
};
export default generateAccessAndRefreshToken;
