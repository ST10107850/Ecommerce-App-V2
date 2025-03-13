import mongoose from "mongoose";
import { z } from "zod";

const productObject = z.object({
  productId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
    message: "Invalid product iD format",
  }),
  quantity: z.number().int().positive(),
  size: z.string().optional(),
  color: z.string().optional(),
});

const addressShipping = z.object({
  addressId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
    message: "Invalid product iD format",
  }),
  street: z.string().min(1),
  town: z.string().min(1),
  city: z.string().min(1),
  postalCode: z.number().int().positive(),
});

export const orderSchema = z.object({
  userId: z.string().refine((id) => mongoose.Types.ObjectId.isValid(id), {
    message: "Invalid product iD format",
  }),
  shippingAddress: z
    .string()
    .refine((id) => mongoose.Types.ObjectId.isValid(id)),
  // orderNumber: z.string().min(1),
  deliveryOption: z.enum(["delivery", "pickup"]),
  paymentMethod: z.enum(["card", "cash"]),
  totalAmount: z.number().positive(),
  taxAmount: z.number().positive(),
  deliveryFee: z.number().int().positive().default(50),
  discount: z.number().int().nonnegative().default(0),
  orderStatus: z
    .enum(["Processing", "Shipped", "Delivered", "Cancelled"])
    .default("Processing"),
  createdAt: z.date().optional(),
});
