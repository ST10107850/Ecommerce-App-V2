import HttpError from "../utils/HttpError.js";
import { NOT_FOUND } from "../constants/http.codes.js";
import Product from "../models/productModel.js";
import Cart from "../models/cartModel.js";

export const createCartService = async (cartData, userId, next) => {
  const { items } = cartData;
  const {productId, quantity, color, size} = items[0];
  if (!userId) {
    return next(new HttpError("User not found", NOT_FOUND));
  }

  const productExist = await Product.findById(productId);
  if (!productExist) {
    throw new HttpError("Product not found", NOT_FOUND);
  }

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({
      user: userId,
      items: [{ productId, quantity }],
    });
  } else {
    const itemIndex = cart.items.findIndex((item) =>
      item.product.equals(productId)
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity, color, size });
    }
  }

  return await cart.save();
};
