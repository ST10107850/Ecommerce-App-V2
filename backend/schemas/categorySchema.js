import { z } from "zod";

export const categorySchema = z.object({
  // userId: z
  //   .string(),
  //   // .regex(/^[0-9a-fA-F]{24}$/, "Invalid user id"),
  categoryName: z
    .string()
    .nonempty("Category name is required")
    .max(50, "Category name must be at most 50 characters long")
    .min(2, "Category name must be at least 2 characters long"),
  ImageUri: z
    .string()
    .nonempty("Image is required")
    .url("Invalid image url")
    .regex(
      /\.(jpg|jpeg|png|gif|svg)$/,
      "URL must point to a valid image file (jpg, jpeg, png, gif, svg)"
    ),
});

export const updateCategoryschema = categorySchema.partial();
