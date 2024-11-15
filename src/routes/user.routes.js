import { Router } from "express";
const router = Router();
import { registerUser } from "../controllers/user.controllers.js";
import upload from "../middlewares/multer.middlewares.js";

router.route("/register").post(upload.single("profileImage"), registerUser);

export default router;
