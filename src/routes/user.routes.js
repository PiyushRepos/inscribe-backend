import { Router } from "express";
const router = Router();
import { verifyJWTToken } from "../middlewares/auth.middlewares.js";
import { getCurrentUser } from "../controllers/user.controllers.js";

router.route("/profile").get(verifyJWTToken, getCurrentUser);

export default router;
