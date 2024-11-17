import { Router } from "express";
import { createPost } from "../controllers/post.controllers.js";
import { verifyJWTToken } from "../middlewares/auth.middlewares.js";
const router = Router();

router.route("/").post(verifyJWTToken, createPost);

export default router;
