import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import ApiError from "./utils/ApiError.js";
import { config } from "./config.js";

app.use(
  cors({
    credentials: true,
    allowedHeaders: true,
    origin: config.CORS_ORIGIN,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);

// global error handler
app.use((err, _, res, __) => {
  if (err instanceof ApiError) {
    res.status(err.statusCode).json({
      error: {
        statusCode: err.statusCode,
        message: err.message,
        success: err.success,
        data: err.data,
        errors: err.errors,
      },
    });
  } else {
    // Default error handler for unexpected errors
    res.status(err.status || 500).json({
      message: err.message || "Internal Server Error",
      success: false,
    });
  }
});

export { app };
