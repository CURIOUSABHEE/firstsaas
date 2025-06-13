import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import Board from "@/models/Board";

export async function POST(req) {
  try {
    const body = await req.json();
    if (!body.name) {
      return NextResponse.json(
        { error: "Board name is required" },
        { status: 400 }
      );
    }

    let session;
    try {
      session = await auth();
    } catch (authError) {
      console.error("Auth error:", authError);
      return NextResponse.json(
        { error: "Authentication failed" },
        { status: 401 }
      );
    }

    if (!session || !session.user?.id) {
      return NextResponse.json({ error: "Not authorised" }, { status: 401 });
    }

    await connectMongo();
    console.log("Mongo connected");

    console.log("Session object:", session);
    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const board = await Board.create({
      userId: user._id,
      name: body.name,
    });

    user.boards.push(board._id);
    await user.save();

    return NextResponse.json({ message: "Board created successfully" });
  } catch (e) {
    console.error("Error creating board:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
