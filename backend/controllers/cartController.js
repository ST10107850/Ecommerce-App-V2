import expressAsyncHandler from "express-async-handler";
import { createCartService, deleteCartItemService } from "../services/cartService.js";
import { CREATED } from "../constants/http.codes.js";
import { deleteOneDoc, getUserDoc } from "../services/crudHandlerFactory.js";
import Cart from "../models/cartModel.js";

export const createCart = expressAsyncHandler(async (req, res, next) => {
  const { items } = req.body;


  const cart = await createCartService(req.user._id, items);

  res.status(CREATED).json({
    status: "success",
    message: "Product has been added to cart",
    data: cart,
  });
});

export const getCartItems =  getUserDoc(Cart, "items.product")

export const deleteCartItem = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  console.log("Controller: ", req.user._id);
  

    const updatedCart = await deleteCartItemService(req.user._id, id);

    res.json({
      success: true,
      message: "Item removed from cart",
      data: updatedCart,
    });
  
});