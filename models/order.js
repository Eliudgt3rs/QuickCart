import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: {
    type: String, // Clerk user ID in your example
    required: true
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId, // Refers to Product model
        ref: "product",
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  amount: {
    type: Number,
    required: true
  },
  address: {
    type: mongoose.Schema.Types.ObjectId, // Refers to Address model
    ref: "address",
    required: true
  },
  status: {
    type: String,
    default: "Order Placed"
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

export default mongoose.models.order || mongoose.model("order", orderSchema);
