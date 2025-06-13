import { Router } from "express";
import {
  createPost,
  deletePost,
  getAllPosts,
  updatePost,
  getPost,
  uploadImage,
  getPostsBySearch,
  likePost,
  dislikePost,
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

router.get("/search", getPostsBySearch);

router
  .route("/:id")
  .put(
    verifyJWTToken,
    isAdmin,
    isAuthor,
    upload.single("thumbnail"),
    updatePost
  )
  .delete(verifyJWTToken, isAdmin, isAuthor, deletePost)
  .get(getPost);

router.route("/:id/like").patch(verifyJWTToken, isAdmin, likePost);
router.route("/:id/dislike").patch(verifyJWTToken, isAdmin, dislikePost);

router.route("/upload-image").post(upload.single("image"), uploadImage);
export default router;
