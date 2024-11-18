import Joi from "joi";

export const validateUserSchema = Joi.object({
  firstName: Joi.string().min(3).trim().required(),
  lastName: Joi.string().min(3).trim().allow("", null),
  fullName: Joi.string().trim().min(3),
  email: Joi.string()
    .email()
    .lowercase()
    .trim()
    .regex(/\S+@\S+\.\S+/)
    .required(),
  username: Joi.string().lowercase().trim().min(3).max(20).allow("", null),
  password: Joi.string().min(6).required().trim(),
  username: Joi.string().lowercase().trim().min(3).max(20),
  bio: Joi.string().default(null),
  profileImage: Joi.string()
    .allow("", null)
    .default(
      "https://res.cloudinary.com/dr9biqyvf/image/upload/v1731653466/default-profile-img_cesild.png"
    ),
  role: Joi.string().default("user"),
});

export const validatePostSchema = Joi.object({
  title: Joi.string().min(10).trim().required(),
  slug: Joi.string().trim(),
  subtitle: Joi.string().trim().min(10).allow(null, ""),
  content: Joi.string().min(10).required(),
  tags: Joi.array().max(5).allow("", null),
});
