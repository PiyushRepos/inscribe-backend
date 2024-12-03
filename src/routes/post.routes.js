import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
  getPost,
  uploadImage,
} from "../controllers/post.controllers.js";
import {
  verifyJWTToken,
  isAdmin,
  isAuthor,
} from "../middlewares/auth.middlewares.js";
const router = Router({ mergeParams: true });
import upload from "../middlewares/multer.middlewares.js";

router
  .route("/")
  .post(verifyJWTToken, upload.single("thumbnail"), createPost)
  .get(getAllPosts);

router
  .route("/:id")
  .put(verifyJWTToken, isAdmin, isAuthor, updatePost)
  .delete(verifyJWTToken, isAdmin, isAuthor, deletePost)
  .get(getPost);

router.route("/upload-image").post(upload.single("image"), uploadImage);
export default router;
