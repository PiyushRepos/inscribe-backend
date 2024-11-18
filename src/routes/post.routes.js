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

router
  .route("/")
  .post(verifyJWTToken, createPost)
  .get(verifyJWTToken, isAdmin, getAllPosts);

router
  .route("/:id")
  .put(verifyJWTToken, isAdmin, isAuthor, updatePost)
  .delete(verifyJWTToken, isAdmin, isAuthor, deletePost)
  .get(verifyJWTToken, getPost);

export default router;
