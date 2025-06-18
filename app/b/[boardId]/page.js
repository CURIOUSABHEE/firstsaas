import FormAddPost from "@/components/FormAddPost";
import connectMongo from "@/libs/mongoose";
import Board from "@/models/Board";
import Post from "@/models/Post";
import { redirect } from "next/navigation";
import CardPost from "@/components/CardPost";

const getBoard = async (boardId) => {
  await connectMongo();

  const board = await Board.findById(boardId);
  const posts = await Post.find({ boardId }).sort({ createdAt: -1 });

  if (!board) {
    redirect("/");
  }
  return {
    board,
    posts,
  };
};

export default async function PublicFeedbackBoard({ params }) {
  const { boardId } = await params;
  const data = await getBoard(boardId);
  const { board, posts } = data;
  return (
    <main className="min-h-screen bg-base-200 flex">
      {board.name}(public)
      <FormAddPost boardId={boardId} />
      <ul>
        {posts.map((post) => (
          <CardPost key={post._id} post={post} />
        ))}
      </ul>
    </main>
  );
}
