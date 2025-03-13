import expressAsyncHandler from "express-async-handler";
import { createCartService } from "../services/cartService.js";
import { CREATED } from "../constants/http.codes.js";

export const createCart = expressAsyncHandler(async (req, res, next) => {
  const cart = await createCartService(req.body, req.user._id, next);

  // if (!cart) return;

  res.status(CREATED).json({
    status: "success",
    message: "Product has been added to cart",
    data: cart,
  });
});
