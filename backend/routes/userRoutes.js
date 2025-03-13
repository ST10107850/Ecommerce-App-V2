import express from "express";
import {
  authUser,
  createUser,
  deleteAddress,
  getCustomerUser,
  getuserProfile,
  logout,
  updateProfile,
  updateUserPassword,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import {
  validateLogin,
  validateRegister,
  validateUpdate,
} from "../middleware/validators/validateUser.js";

const router = express.Router();

router.post("/", validateRegister, createUser);

router.get("/", protect, getCustomerUser);
router.post("/auth", authUser);
router.post("/logout", logout);
router.get("/profile", protect, getuserProfile);
router.put("/profile", protect, validateUpdate, updateProfile);
router.put("/update-password", protect, validateUpdate, updateUserPassword);
router.delete("/delete-address/:addressId", protect, deleteAddress);
export default router;
