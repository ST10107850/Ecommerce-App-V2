import express from "express";
import {
  createCategory,
  // deleteCategory,
  getAllCategories,
  updateCategory,
} from "../controllers/categoryController.js";
import {protect} from "../middleware/authMiddleware.js"
import {roleMiddleware} from "../middleware/roleMiddleware.js"
import { updateValidate, validateCategory } from "../middleware/validators/categoryValidation.js";

const router = express.Router();

router.post("/",validateCategory, protect, roleMiddleware(["admin"]), createCategory);
router.get("/", getAllCategories);
router.put("/:id", protect, roleMiddleware(["admin"]),updateValidate, updateCategory);
// router.delete("/:id",protect, roleMiddleware(["admin"]), deleteCategory);

export default router;
