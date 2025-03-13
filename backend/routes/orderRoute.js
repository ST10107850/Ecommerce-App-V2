import { Router } from "express";
import { protect } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
import { orderValidation } from "../middleware/validators/orderValidation.js";
import {
  createOrders,
  getAllOrders,
  getOrderDetails,
  getUserOrders,
} from "../controllers/ordersController.js";

const orderRoute = Router();

orderRoute.post(
  "/create",
  protect,
  roleMiddleware(["customer"]),
  orderValidation,
  createOrders
);

orderRoute.get("/", protect, roleMiddleware(["admin"]), getAllOrders);

orderRoute.get(
  "/customer",
  protect,
  roleMiddleware(["customer"]),
  getUserOrders
);
orderRoute.get("/:id", protect, getOrderDetails);
export default orderRoute;
