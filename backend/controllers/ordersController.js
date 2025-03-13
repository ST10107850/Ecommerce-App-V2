import expressAsyncHandler from "express-async-handler";
import { createOrderService } from "../services/orderService.js";
import { CREATED, NOT_FOUND, OK } from "../constants/http.codes.js";
import { getAllDoc, getUserDoc } from "../services/crudHandlerFactory.js";
import Order from "../models/orderModel.js";

export const createOrders = expressAsyncHandler(async (req, res) => {
  const { shippingAddress, paymentMethod, cardDetails, deliveryOption } =
    req.body;
  const userId = req.user._id;

  const order = await createOrderService(
    userId,
    shippingAddress,
    paymentMethod,
    cardDetails,
    deliveryOption
  );

  res
    .status(CREATED)
    .json({ success: true, message: "Order placed successfully", data: order });
});

export const getAllOrders = getAllDoc(Order);

export const getUserOrders = getUserDoc(Order, {
  path: "cart.cartId",
  populate: {
    path: "items.product",
    model: "Products",
  },
});

export const getOrderDetails = expressAsyncHandler(async (req, res, next) => {
  const { id } = req.params;
  
  const order = await Order.findById(id)
    .populate({
      path: "cart.cartId",
      populate: {
        path: "items.product",
        model: "Products",
      },
    })
    .lean(); 
  if (!order) {
    return next(new HttpError("No order found with that ID", NOT_FOUND));
  }

  res.status(OK).json({
    success: true,
    id: req.params.id,
    data: order,
  });
});

