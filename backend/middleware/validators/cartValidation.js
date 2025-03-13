import expressAsyncHandler from "express-async-handler";
import { cartSchema } from "../../schemas/cartSchema.js";

export const cartValidation = expressAsyncHandler(
  async (req, res, next) => {
    const {userId} = req.user._id;
    const {items} = req.body;


    const result = await cartSchema.safeParse({userId, items});
    console.log("Prodwf: ", req.body)

    if (!result.success) {
      return next(result.error);
    }

    req.body = result.data;
    next();
  }
);
