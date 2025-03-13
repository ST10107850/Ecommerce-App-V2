import { Router } from "express";
import {
  createWishlist,
  deleteWishlist,
  getUserWishlist,
} from "../controllers/wishlistController.js";
import { protect } from "../middleware/authMiddleware.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";
import { wishlistValidation } from "../middleware/validators/wishlistValidation.js";

const wishlistRoute = Router();

wishlistRoute.post(
  "/:productId",
  protect,
  wishlistValidation,
  roleMiddleware(["customer"]),
  createWishlist
);

wishlistRoute.get("/", protect, roleMiddleware(["customer"]), getUserWishlist);

wishlistRoute.delete(
  "/:id",
  protect,
  roleMiddleware(["customer"]),
  deleteWishlist
);

export default wishlistRoute;
