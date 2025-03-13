import express from "express";
import { createCart, deleteCartItem, getCartItems } from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
import {cartValidation} from "../middleware/validators/cartValidation.js"

const cartRoute = express.Router();

cartRoute.post("/", protect, cartValidation, roleMiddleware(["customer"]), createCart);
cartRoute.get("/", protect, roleMiddleware(["customer"]), getCartItems);
cartRoute.delete("/:id",protect, roleMiddleware(["customer"]), deleteCartItem);
// router.put('/:id', protect, updateCartQuantity);
// cartRoute.delete("/:id", protect, deleteCartItem);


export default cartRoute;
