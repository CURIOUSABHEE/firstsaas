import { NextResponse } from "next/server";
import connectMongo from "@/libs/mongoose";
import Post from "@/models/Post";
import Board from "@/models/Board";
import { auth } from "@/auth";
import { Filter } from "bad-words";

export async function POST(req) {
  try {
    // Parse request
    const body = await req.json();
    const { title, description } = body;
    const { searchParams } = req.nextUrl;
    const boardId = searchParams.get("boardId");

    // Validate required fields
    if (!title || !description || !boardId) {
      return NextResponse.json(
        { error: "Title, Description and BoardId required" },
        { status: 400 }
      );
    }

    // Connect to database
    await connectMongo();

    // Get user session
    const session = await auth();

    // Check if board exists
    const boardExists = await Board.findById(boardId);
    if (!boardExists) {
      return NextResponse.json({ error: "Board not found" }, { status: 404 });
    }

    // Filter bad words
    const badWordsFilter = new Filter();
    const sanitizedTitle = badWordsFilter.clean(title);
    const sanitizedDescription = badWordsFilter.clean(description);

    // Create post
    const post = new Post({
      title: sanitizedTitle,
      description: sanitizedDescription,
      boardId,
      userId: session?.user?.id,
    });

    const savedPost = await post.save();

    return NextResponse.json(
      {
        message: "Post created successfully",
        post: {
          id: savedPost._id,
          title: savedPost.title,
          description: savedPost.description,
          boardId: savedPost.boardId,
          userId: savedPost.userId,
          createdAt: savedPost.createdAt,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create post", details: error.message },
      { status: 500 }
    );
  }
}
