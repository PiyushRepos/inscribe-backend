import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import { config } from "../config.js";

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_API_KEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const res = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    return res;
  } catch (error) {
    fs.unlinkSync(localFilePath);
    return error;
  }
};

export default uploadOnCloudinary;
