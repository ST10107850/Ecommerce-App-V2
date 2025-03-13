import { z } from "zod";

export const wishlistSchema = z.object({
  userId: z
    .string()
    .nonempty("User ID is required")
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid User ID format"),
  productId: z
    .string()
    .nonempty("Product ID is required")
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid Product ID format"),
});
