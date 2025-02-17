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
  profileImage: Joi.allow("", null),
  role: Joi.string().default("user"),
});

export const validatePostSchema = Joi.object({
  title: Joi.string().min(10).trim().required(),
  slug: Joi.string().trim(),
  summary: Joi.string().trim().min(10).allow(null, ""),
  content: Joi.string().min(10).required(),
  tags: Joi.array().max(5).allow("", null),
  thumbnail: Joi.string(),
});
