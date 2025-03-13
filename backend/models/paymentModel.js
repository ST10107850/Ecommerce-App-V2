import mongoose from "mongoose";

const paymentSchema = mongoose.Schema(
  {
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    paymentMethod: {
      type: String,
      enum: ["card", "cash"],
      required: true,
    },

    cardDetails: [
      {
        cardType: {
          type: String,
          enum: ["mastercard", "visa"],
        },
        cardNumber: String,
        cardHolder: String,
        expiryDate: Date,
        cvv: Number,
      },
    ],
  },
  { timestamps: true }
);

const Payment = mongoose.model("Payment", paymentSchema);
export default Payment;
