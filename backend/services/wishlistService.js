import HttpError from "../utils/HttpError.js";
import { BAD_REQUEST, NOT_FOUND } from "../constants/http.codes.js";
import Wishlist from "../models/wishlistModel.js";

export const createWishlistService = async (wishlistData, userId, next) => {
  if (!userId) {
    return next(new HttpError("User not found", NOT_FOUND));
  }

  const { productId } = wishlistData;

  if (!productId) {
    throw new HttpError("Product ID is required", BAD_REQUEST)
    }

  const existingWishlistItem = await Wishlist.findOne({ userId, productId });

  if (existingWishlistItem) {
    throw new HttpError("Product already in wishlist", BAD_REQUEST)
   }

    const wishlistItems = await Wishlist.create({
      userId: userId,
      productId,
    });
  
    return wishlistItems;
};
