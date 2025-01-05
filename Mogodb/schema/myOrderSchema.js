import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    order_id: {
      type: String,
      unique: true, // Order ID should be unique
      required: true,
    },
    payment_id: {
      type: String,
      required: true, // ID from the payment gateway
    },
    name: {
      type: String,
      required: true, // Name of the user
    },
    plan: {
      type: String,
      required: true, // Plan or service type
    },
  },
  { timestamps: true }
);

const myOrder = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default myOrder;
