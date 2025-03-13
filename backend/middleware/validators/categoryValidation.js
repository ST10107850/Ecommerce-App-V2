import expressAsyncHandler from "express-async-handler";
import {
  categorySchema,
  updateCategoryschema,
} from "../../schemas/categorySchema.js";
import { BAD_REQUEST } from "../../constants/http.codes.js";

export const validateCategory = expressAsyncHandler(async (req, res, next) => {
  const result = await categorySchema.safeParse(req.body);

  if (!result.success) {
    return next(result.error);
  }

  req.body = result.data;
  next();
});

export const updateValidate = expressAsyncHandler(async (req, res, next) => {
  const result = await updateCategoryschema.safeParse(req.body);

  if (!result.success) {
    return next(new HttpError(result.error.errors[0].message, BAD_REQUEST));
  }
  next();
});
