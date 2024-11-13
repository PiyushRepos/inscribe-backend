import mongoose from "mongoose";
import { DB_NAME } from "../contants.js";
import { config } from "../config.js";

const connectDB = async () => {
  try {
    const connectionInsatnce = await mongoose.connect(
      `${config.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `MongoDB connected !! DB HOST ${connectionInsatnce.connection.host}`
    );
  } catch (error) {
    console.log("MongoDB connection error", error);
    process.exit(1);
  }
};

export default connectDB;
