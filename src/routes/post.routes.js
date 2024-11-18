import { Router } from "express";
import {
  createPost,
  deletePost,
  updatePost,
} from "../controllers/post.controllers.js";
import {
  verifyJWTToken,
  isAdmin,
  isAuthor,
} from "../middlewares/auth.middlewares.js";
const router = Router({ mergeParams: true });

router.route("/").post(verifyJWTToken, createPost);
router
  .route("/:id")
  .put(verifyJWTToken, isAdmin, isAuthor, updatePost)
  .delete(verifyJWTToken, isAdmin, isAuthor, deletePost);

export default router;
