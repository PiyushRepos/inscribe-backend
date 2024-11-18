import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
  getPost,
} from "../controllers/post.controllers.js";
import {
  verifyJWTToken,
  isAdmin,
  isAuthor,
} from "../middlewares/auth.middlewares.js";
const router = Router({ mergeParams: true });

router.route("/").post(verifyJWTToken, createPost).get(getAllPosts);

router
  .route("/:id")
  .put(verifyJWTToken, isAdmin, isAuthor, updatePost)
  .delete(verifyJWTToken, isAdmin, isAuthor, deletePost)
  .get(getPost);

export default router;
