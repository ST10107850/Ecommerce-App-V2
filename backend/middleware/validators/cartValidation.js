import expressAsyncHandler from "express-async-handler";
import { cartSchema } from "../../schemas/cartSchema.js";

export const cartValidation = expressAsyncHandler(async (req, res, next) => {
  const userId = req.user?._id.toString();
  let { items } = req.body;

  // Fix nested items structure
  if (items && items.items) {
    items = items.items;
  }

  // Convert productId → product if necessary
  items = items.map(item => ({
    product: item.productId || item.product, 
    quantity: item.quantity,
    color: item.color || null,
    size: item.size || null
  }));

  // Validate using Zod
  const result = await cartSchema.safeParse({ userId, items });

  if (!result.success) {
    return res.status(400).json({ error: result.error.format(), message: "Validation Error" });
  }

  req.body = result.data;
  next();
});

