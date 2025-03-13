import expressAsyncHandler from "express-async-handler";
import {
  loginSchema,
  registerSchema,
  updateUserSchema,
} from "../../schemas/authSchema.js";
import HttpError from "../../utils/HttpError.js";
import {BAD_REQUEST} from "../../constants/http.codes.js"

export const validateLogin = expressAsyncHandler(async (req, res, next) => {
  const result = await loginSchema.safeParse(req.body);

  if (!result.success) {
    return next(result.error);
  }

  req.body = result.data;
  next();
});

export const validateRegister = expressAsyncHandler(async (req, res, next) => {
  const result = await registerSchema.safeParse(req.body);

  if (!result.success) {
    return next(result.error);
  }

  req.body = result.data;
  next();
});

export const validateUpdate = (req, res, next) => {
  const result = updateUserSchema.safeParse(req.body);

  if (!result.success) {
    return next(new HttpError(result.error.errors[0].message, BAD_REQUEST));
  }

  next();
};
