import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Post from "@/models/Post";
import Board from "@/models/Board";
import User from "@/models/User"; // ✅ Import User
import { auth } from "@/auth";

export async function DELETE(req) {
  try {
    const { searchParams } = req.nextUrl;
    const postId = searchParams.get("postId");

    if (!postId) {
      return NextResponse.json(
        { error: "PostId is required" },
        { status: 400 }
      );
    }

    await connectMongo();
    const session = await auth();
    const user = await User.findById(session?.user?.id);

    if (!user?.hasAccess) {
      return NextResponse.json(
        { error: "Please Subscribe first" },
        { status: 403 }
      );
    }

    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    if (!user.boards.includes(post.boardId.toString())) {
      return NextResponse.json(
        { error: "Unauthorized to delete this post" },
        { status: 401 }
      );
    }

    await Post.deleteOne({ _id: postId });

    return NextResponse.json(
      { message: "Post deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete post", details: error.message },
      { status: 500 }
    );
  }
}
