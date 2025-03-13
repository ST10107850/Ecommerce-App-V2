import mongoose from "mongoose";
import { z } from "zod";

export const wishlistSchema = z.object({
  userId: z
    .string()
    .nonempty("User ID is required")
    .refine((id) => mongoose.Types.ObjectId.isValid(id)),
  productId: z
    .string()
    .nonempty("Product ID is required")
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid Product ID format"),
});
