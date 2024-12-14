import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import ApiError from "./utils/ApiError.js";
import { config } from "./config.js";

app.use(
  cors({
    credentials: true,
    origin: config.CORS_ORIGIN,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);

app.get("/", () => {
  res.json({ message: "Hello World" });
});

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
        stack: config.NODE_ENV === "development" ? err.stack : [],
      },
    });
  } else {
    // Default error handler for unexpected errors
    // res.status(err.status || 500).json({
    //   message: err.message || "Internal Server Error",
    //   success: false,
    //   error: config.NODE_ENV === "development" ? err.stack : [],
    // });
  }
});

export { app };
