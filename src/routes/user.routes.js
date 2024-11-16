import { Router } from "express";
const router = Router();
import { loginUser, registerUser } from "../controllers/user.controllers.js";
import upload from "../middlewares/multer.middlewares.js";

router.route("/register").post(upload.single("profileImage"), registerUser);
router.route("/login").post(loginUser);

export default router;
