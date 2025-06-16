import { NextResponse } from "next/server";
import { auth } from "@/auth";
import connectMongo from "@/libs/mongoose";
import User from "@/models/User";
import Board from "@/models/Board";
import { error } from "console";

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

    if (!user.hasAccess) {
      return NextResponse.json(
        { error: "Please subscribe first" },
        { status: 403 }
      );
    }
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

export async function DELETE(req) {
  try {
    const { searchParams } = req.nextUrl;
    const boardId = searchParams.get("boardId");

    if (!boardId) {
      return NextResponse.json(
        { error: "boardId is required" },
        { status: 400 }
      );
    }

    const session = await auth();
    if (!session) {
      return NextResponse.json({ error: "Not authorised" }, { status: 401 });
    }

    await Board.deleteOne({
      _id: boardId,
      userId: session?.user?.id,
    });

    const user = await User.findById(session?.user?.id);
    user.boards = user.boards.filter((id) => id.toString() !== boardId);

    await user.save();

    return NextResponse.json({});
  } catch (e) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
