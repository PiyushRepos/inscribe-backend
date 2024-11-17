import { Router } from "express";
import { createPost, updatePost } from "../controllers/post.controllers.js";
import { isAuthor } from "../middlewares/auth.middlewares.js";
const router = Router();

router.route("/").post(createPost);
router.route("/:id").put(isAuthor, updatePost);

export default router;
