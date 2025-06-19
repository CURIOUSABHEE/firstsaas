import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Post from "@/models/Post";
import { auth } from "@/auth";

export async function POST(req) {
  const { searchParams } = req.nextUrl;
  const postId = searchParams.get("postId");

  try {
    await connectMongo();
    const session = await auth();

    if (!postId) {
      return NextResponse.json(
        { error: "PostId is required" },
        { status: 400 }
      );
    }

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Increment the votes count
    post.votesCount += 1;
    await post.save();

    return NextResponse.json(
      { message: "Vote added successfully", post },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add vote", details: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  const { searchParams } = req.nextUrl;
  const postId = searchParams.get("postId");

  try {
    await connectMongo();
    const session = await auth();

    if (!postId) {
      return NextResponse.json(
        { error: "PostId is required" },
        { status: 400 }
      );
    }

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Increment the votes count
    post.votesCount -= 1;
    await post.save();

    return NextResponse.json(
      { message: "Vote removed successfully", post },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add vote", details: error.message },
      { status: 500 }
    );
  }
}
