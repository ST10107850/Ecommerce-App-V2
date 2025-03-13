import express from "express";
import { validateProduct } from "../middleware/validators/productValidation.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getCategoryProduct,
  getProductDetails,
  updatedProduct,
} from "../controllers/productController.js";
import { roleMiddleware } from "../middleware/roleMiddleware.js";

const router = express.Router();

router.post(
  "/create",
  protect,
  roleMiddleware(["admin"]),
  validateProduct,
  createProduct
);

router.get("/", getAllProduct);

router.get("/category/:categoryId", getCategoryProduct);
router.get("/:id", getProductDetails);

router.put("/:id", protect, roleMiddleware(["admin"]), updatedProduct);
router.delete("/:id", protect, roleMiddleware(["admin"]), deleteProduct);

export default router;
