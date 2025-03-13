import HttpError from "../utils/HttpError.js";
import { NOT_FOUND, UNAUTHORIZED } from "../constants/http.codes.js";
import Product from "../models/productModel.js";
import Cart from "../models/cartModel.js";
import expressAsyncHandler from "express-async-handler";

export const createCartService = async (userId, items) => {
  if (!userId) {
    throw new HttpError("User not found", NOT_FOUND);
  }

  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = new Cart({
      user: userId,
      items: items.map(({ product, quantity, color, size }) => ({
        product,
        quantity,
        color,
        size,
      })),
    });
  } else {
    items.forEach(({ product, quantity, color, size }) => {
      const itemIndex = cart.items.findIndex((item) =>
        item.product?.equals(product)
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ product, quantity, color, size });
      }
    });
  }

  return await cart.save();
};

export const deleteCartItemService = async (userId, itemId) => {
  console.log("Service: ", userId);

  if (!userId) {
    throw new HttpError("User not found", UNAUTHORIZED);
  }
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new HttpError("Cart not found", NOT_FOUND);
  }

  const itemIndex = cart.items.findIndex(
    (item) => item._id.toString() === itemId
  );

  if (itemIndex === -1) {
    throw new HttpError("Item not found in cart", NOT_FOUND);
  }

  cart.items.splice(itemIndex, 1);
  await cart.save();

  const updatedCart = await Cart.findOne({ user: userId }).populate(
    "items.product"
  );

  return updatedCart;
};

export const updateCartQuantityService = async (userId, itemId, quantity) => {
  const cart = await Cart.findOne({ user: userId });

  if (!cart) {
    throw new HttpError("Cart not found", NOT_FOUND);
  }

  const itemIndex = cart.items.findIndex(
    (item) => item._id.toString() === itemId
  );

  if (itemIndex === -1) {
    throw new HttpError("Item not found in cart", NOT_FOUND);
  }

  cart.items[itemIndex].quantity = quantity;
  await cart.save();

  const updatedCart = await Cart.findOne({ user: userId }).populate(
    "items.product"
  );

  return updatedCart;
};

export const updateCartQuantity = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  const updatedCart = await updateCartQuantityService(
    req.user._id,
    id,
    quantity
  );

  res.json({
    success: true,
    message: "Cart updated",
    data: updatedCart,
  });
});
