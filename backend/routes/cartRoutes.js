import express from "express";
import { createCart } from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
import {cartValidation} from "../middleware/validators/cartValidation.js"

const cartRoute = express.Router();

// cartRoute.post("/", protect, cartValidation, roleMiddleware(["customer"]), createCart);
// router.get("/", protect, roleMiddleware(["customer"]), getCartItems);
// router.put('/:id', protect, updateCartQuantity);
// router.delete("/:id", protect, deleteCartItem);


export default cartRoute;
