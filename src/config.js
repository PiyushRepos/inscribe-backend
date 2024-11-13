import dotenv from "dotenv";
dotenv.config();

export const config = {
  PORT: String(process.env.PORT) || 5001,
  MONGODB_URI: String(process.env.MONGODB_URI),
  CORS_ORIGIN: String(process.env.CORS_ORIGIN),
  CLOUDINARY_CLOUD_NAME: String(process.env.CLOUDINARY_CLOUD_NAME),
  CLOUDINARY_API_KEY: String(process.env.CLOUDINARY_API_KEY),
  CLOUDINARY_API_SECRET: String(process.env.CLOUDINARY_API_SECRET),
};
