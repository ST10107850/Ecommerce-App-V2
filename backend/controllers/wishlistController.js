import expressAsyncHandler from "express-async-handler";
import { createWishlistService } from "../services/wishlistService.js";
import { BAD_REQUEST, CREATED } from "../constants/http.codes.js";
import { deleteOneDoc, getUserDoc } from "../services/crudHandlerFactory.js";
import Wishlist from "../models/wishlistModel.js";

export const createWishlist = expressAsyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const userId = req.user?._id;

  const wishlist = await createWishlistService( productId , userId, next);

  res.status(CREATED).json({
    status: "success",
    message: "Product has been added to wishlist",
    data: wishlist,
  });
});

export const getUserWishlist = getUserDoc(Wishlist, {
  path: "productId",
  select: "productName price description ImageUri",
});

export const deleteWishlist = deleteOneDoc(Wishlist);
