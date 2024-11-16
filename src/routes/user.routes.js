import { Router } from "express";
const router = Router();
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controllers.js";
import upload from "../middlewares/multer.middlewares.js";
import { verifyJWTToken } from "../middlewares/auth.middlewares.js";

router.route("/register").post(upload.single("profileImage"), registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyJWTToken, logoutUser);

export default router;
