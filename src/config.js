import dotenv from "dotenv";
dotenv.config();

export const config = {
  NODE_ENV: String(process.env.NODE_ENV),
  PORT: String(process.env.PORT) || 3000,
  MONGODB_URI: String(process.env.MONGODB_URI),
  CORS_ORIGIN: String(process.env.CORS_ORIGIN),
  CLOUDINARY_CLOUD_NAME: String(process.env.CLOUDINARY_CLOUD_NAME),
  CLOUDINARY_API_KEY: String(process.env.CLOUDINARY_API_KEY),
  CLOUDINARY_API_SECRET: String(process.env.CLOUDINARY_API_SECRET),
  JWT_ACCESS_TOKEN_SECRET: String(process.env.JWT_ACCESS_TOKEN_SECRET),
  JWT_ACCESS_TOKEN_EXPIRY: String(process.env.JWT_ACCESS_TOKEN_EXPIRY),
  JWT_REFRESH_TOKEN_SECRET: String(process.env.JWT_REFRESH_TOKEN_SECRET),
  JWT_REFRESH_TOKEN_EXPIRY: String(process.env.JWT_REFRESH_TOKEN_EXPIRY),
};
