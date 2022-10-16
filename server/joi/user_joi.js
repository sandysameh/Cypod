import Joi from "joi";
export const logincheck = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const signupcheck = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required().min(8).max(255).uppercase(1).lowercase(1),
  role: Joi.string().required().valid("A", "E", "U"),
});
