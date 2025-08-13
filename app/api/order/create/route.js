import { inngest } from "@/config/inngest";
import Product from "@/models/Product";
import Order from "@/models/order";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import User from "@/models/User";
import mongoose from "mongoose";

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const { address, items } = await request.json();

    if (!address || !items || items.length === 0) {
      return NextResponse.json({ success: false, message: "Invalid Data" });
    }

    // calculate total amount
    let amount = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return NextResponse.json({
          success: false,
          message: `Product not found: ${item.product}`,
        });
      }
      amount += product.offerPrice * item.quantity;
    }

    const finalAmount = amount + Math.floor(amount * 0.005);

    // create and save order directly
    const order = await Order.create({
      userId, // Clerk ID (string)
      address: new mongoose.Types.ObjectId(address),
      items: items.map((i) => ({
        product: new mongoose.Types.ObjectId(i.product),
        quantity: i.quantity
      })),
      amount: finalAmount,
      date: Date.now(),
      status: "Order Placed"
    });

    // send Inngest event for async stuff (emails, notifications, etc.)
    await inngest.send({
      name: "order/created",
      data: {
        orderId: order._id,
        userId,
        amount: finalAmount,
        date: order.date
      },
    });

    // clear user cart
    const user = await User.findById(userId);
    if (user) {
      user.cartItems = {};
      await user.save();
    }

    return NextResponse.json({ success: true, message: "Order Placed", order });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
