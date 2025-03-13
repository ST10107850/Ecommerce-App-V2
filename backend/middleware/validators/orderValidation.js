import expressAsyncHandler from "express-async-handler";
import { orderSchema } from "../../schemas/orderSchema.js";
import { BAD_REQUEST } from "../../constants/http.codes.js";
import HttpError from "../../utils/HttpError.js";

export const orderValidation = expressAsyncHandler(async (req, res, next) => {
  const userId = req.user?._id.toString();

  let {
    cartId,
    shippingAddress,
    paymentMethod,
    cardDetails,
    deliveryOption,
    totalAmount,
    taxAmount,
    // orderNumber,
  } = req.body;

  if (!cartId) {
    throw new HttpError("cartId is required", BAD_REQUEST);
  }

  // Validate cartId and other fields
  const result = orderSchema.safeParse({
    userId,
    cartId,
    shippingAddress,
    paymentMethod,
    cardDetails,
    deliveryOption,
    totalAmount,
    taxAmount,
    // orderNumber,
  });

  if (!result.success) {
    throw new HttpError(
      { error: result.error.format(), message: "Validation Error" },
      BAD_REQUEST
    );
  }

  req.body = result.data;

  next();
});

