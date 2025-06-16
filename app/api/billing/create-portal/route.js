import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import Stripe from "stripe";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.returnUrl) {
      return NextResponse.json(
        { error: "Return URL is required" },
        { status: 400 }
      );
    }

    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    await connectMongo();
    const user = await User.findById(session.user.id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const stripeCustomerPortal = await stripe.billingPortal.sessions.create({
      customer: user.customerId,
      return_url: body.returnUrl,
    });

    return NextResponse.json({ url: stripeCustomerPortal.url });
  } catch (e) {
    console.error("Stripe checkout error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
