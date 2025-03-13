import expressAsyncHandler from "express-async-handler";
import { productSchema } from "../../schemas/productSchema.js";

export const validateProduct = expressAsyncHandler(async (req, res, next) => {
  const result = await productSchema.safeParse(req.body);

  if (!result.success) {
    return next(result.error);
  }

  req.body = result.data;
  next();
});
