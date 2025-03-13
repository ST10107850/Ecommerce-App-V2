import HttpError from "../utils/HttpError.js";
import { BAD_REQUEST, UNAUTHORIZED } from "../constants/http.codes.js";
import Cart from "../models/cartModel.js";
import Users from "../models/userModel.js";
import Order from "../models/orderModel.js";
import Payment from "../models/paymentModel.js";
import Product from "../models/productModel.js";

export const createOrderService = async (
  userId,
  shippingAddress,
  paymentMethod,
  cardDetails,
  deliveryOption
) => {
  if (!userId) {
    throw new HttpError("User not found", UNAUTHORIZED);
  }

  if (!shippingAddress) {
    throw new HttpError("Shipping address is required", BAD_REQUEST);
  }

  const carts = await Cart.find({ user: userId });

  if (!carts || carts.length === 0) {
    throw new HttpError("No carts found for the user.", BAD_REQUEST);
  }

  const user = await Users.findById(userId);

  if (!user) {
    throw new HttpError("User not found", UNAUTHORIZED);
  }

  if (!user.address || !Array.isArray(user.address)) {
    throw new HttpError("User does not have any addresses", BAD_REQUEST);
  }

  const userAddress = user.address.find((address) =>
    address._id.equals(shippingAddress)
  );

  if (!userAddress) {
    throw new HttpError("Address not found", BAD_REQUEST);
  }

  let subtotal = 0;
  const cartItems = [];

  for (const cart of carts) {
    const items = await Promise.all(
      cart.items.map(async (cartItem) => {
        const product = await Product.findById(cartItem.product._id);

        if (!product) {
          throw new HttpError(
            `Product not found: ${cartItem.product._id}`,
            BAD_REQUEST
          );
        }

        if (typeof product.price !== "number" || isNaN(product.price)) {
          throw new HttpError(
            `Invalid product price: ${cartItem.product._id}`,
            BAD_REQUEST
          );
        }

        const totalPrice = product.price * cartItem.quantity;
        subtotal += totalPrice;

        return {
          product: product._id,
          quantity: cartItem.quantity,
          size: cartItem.size || "N/A",
          color: cartItem.color || "N/A",
        };
      })
    );

    cartItems.push({
      cartId: cart._id,
      items,
    });
  }

  const deliveryFee = deliveryOption === "pickup" ? 0 : 50;
  const tax = subtotal * 0.1;
  const discount = 0;
  const totalAmount = subtotal + deliveryFee + tax - discount;

  if (isNaN(tax) || isNaN(totalAmount)) {
    throw new HttpError("Invalid tax or total amount calculation", BAD_REQUEST);
  }
  const orderNumber = "ORD-" + Math.floor(100000 + Math.random() * 900000);

  
  const order = new Order({
    userId,
    cart: cartItems,
    shippingAddress: {
      addressId: shippingAddress,
      street: userAddress.street,
      town: userAddress.town,
      city: userAddress.city,
      postalCode: userAddress.postalCode,
    },
    deliveryOption,
    paymentMethod,
    totalAmount,
    taxAmount: tax,
    deliveryFee,
    discount,
    orderNumber,
    orderStatus: "Processing",
  });

  await order.save();

  if (paymentMethod === "card" && cardDetails) {
    const payment = new Payment({
      orderId: order._id,
      userId,
      paymentMethod,
      cardDetails,
    });

    await payment.save();
  }

  await Cart.findOneAndDelete({ user: userId });

  return order;
};
