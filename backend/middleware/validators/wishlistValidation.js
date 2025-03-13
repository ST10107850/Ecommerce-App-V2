import expressAsyncHandler from "express-async-handler";
import { wishlistSchema } from "../../schemas/wishlistSchema.js";
import { BAD_REQUEST } from "../../constants/http.codes.js";
import HttpError from "../../utils/HttpError.js";

export const wishlistValidation = expressAsyncHandler(
  async (req, res, next) => {
    if (!req.user || !req.user._id) {
      throw new HttpError("User ID is required", BAD_REQUEST);
    }
  
    // Ensure productId exists in request params
    if (!req.params.productId) {
      throw new HttpError("Product ID is required", BAD_REQUEST);
    }

    const userId = req.user._id.toString();
    const { productId } = req.params;

    const result = wishlistSchema.safeParse({ userId, productId });

    if (!result.success) {
      throw new HttpError(result.error.errors[0].message, BAD_REQUEST);
    }

    req.validatedData = result.data;
    next();
  }
);
