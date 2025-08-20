import { inngest } from "@/config/inngest";
import Product from "@/models/Product";
import Order from "@/models/order";
import { getAuth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import User from "@/models/User";
import mongoose from "mongoose";
import twilio from "twilio";

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

export async function POST(request) {
  try {
    const { userId } = getAuth(request);
    const { address, items, paymentMethod } = await request.json();

    if (!address || !items || items.length === 0 || !paymentMethod) {
      return NextResponse.json({ success: false, message: "Invalid Data" });
    }

    let amount = 0;
    const productDetails = [];

    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) {
        return NextResponse.json({
          success: false,
          message: `Product not found: ${item.product}`,
        });
      }
      const itemTotal = product.offerPrice * item.quantity;
      amount += itemTotal;

      productDetails.push({
        name: product.name,
        quantity: item.quantity,
        price: product.offerPrice,
        total: itemTotal,
      });
    }

    const finalAmount = amount + Math.floor(amount * 0.005);

    const order = await Order.create({
      userId,
      address: new mongoose.Types.ObjectId(address),
      items: items.map((i) => ({
        product: new mongoose.Types.ObjectId(i.product),
        quantity: i.quantity
      })),
      amount: finalAmount,
      date: Date.now(),
      status: "Order Placed",
      paymentMethod
    });

    await inngest.send({
      name: "order/created",
      data: {
        orderId: order._id,
        userId,
        amount: finalAmount,
        date: order.date
      },
    });

    const user = await User.findById(userId);
    if (user) {
      user.cartItems = {};
      await user.save();
    }

    // Create formatted product list for WhatsApp
    const productList = productDetails
      .map(
        (p, index) =>
          `${index + 1}. ${p.name} (x${p.quantity}) - ${p.price} KES each = ${p.total} KES`
      )
      .join("\n");

    // Create WhatsApp message
    const whatsappMessage = 
`🛒 *New Order Received*
📦 Order ID: ${order._id}

${productList}

💰 *Total:* ${finalAmount} KES
💳 *Payment Method:* ${paymentMethod}
🔗 View Order: https://yenustore.vercel.app/seller/orders
`;

    await client.messages.create({
      body: whatsappMessage,
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_NUMBER}`,
      to: `whatsapp:${process.env.MY_PHONE_NUMBER}`
    });

    return NextResponse.json({ success: true, message: "Order Placed", order });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, message: error.message });
  }
}
