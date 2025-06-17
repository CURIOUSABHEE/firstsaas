import Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    const body = await req.text();
    const signature = headers().get("stripe-signature");

    if (!signature) {
      console.error("Missing Stripe signature header");
      return NextResponse.json(
        { error: "Missing Stripe signature" },
        { status: 400 }
      );
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    let event;
    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error(`⚠️ Webhook signature verification failed:`, err.message);
      return NextResponse.json({ error: err.message }, { status: 400 });
    }

    const { data, type } = event;

    if (type === "checkout.session.completed") {
      try {
        await connectMongo();
        const user = await User.findById(data.object.client_reference_id);

        if (!user) {
          console.error("User not found:", data.object.client_reference_id);
          return NextResponse.json(
            { error: "User not found" },
            { status: 404 }
          );
        }

        user.hasAccess = true;
        user.customerId = data.object.customer;
        await user.save();

        return NextResponse.json({ received: true });
      } catch (err) {
        console.error("Error updating user:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
      }
    } else if (type === "customer.subscription.deleted") {
      //revoke the access to the product
      try {
        await connectMongo();
        const user = await User.findOne({ customerId: data.object.customer });

        user.hasAccess = false;
        await user.save();

        return NextResponse.json({ received: true });
      } catch (err) {
        console.error("Error updating user on subscription deletion:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
      }
    }

    console.log(`Unhandled event type: ${type}`);
    return NextResponse.json({ received: true });
  } catch (e) {
    console.error("Stripe error:", e.message);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
