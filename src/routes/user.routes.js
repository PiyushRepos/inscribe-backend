import { Router } from "express";
const router = Router();
import { registerUser } from "../controllers/user.controllers.js";
import { checkSchema, body } from "express-validator";
import { validateUserSchema } from "../utils/validateSchema.js";

router.route("/register").post(checkSchema(validateUserSchema), registerUser);

export default router;
