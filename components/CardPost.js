import UpvoteButton from "./UpvoteButton";

const CardPost = ({ post }) => {
  if (!post) return null;

  return (
    <li className="bg-base-100 p-6 rounded-3xl flex justify-between items-center">
      <div>
        <div className="font-bold mb-1">{post.title}</div>
        <div className="opacity-80 leading-relaxed max-h-32 overflow-scroll">
          {post.description}
        </div>
      </div>
      <UpvoteButton
        postId={post._id.toString()}
        initialVotesCount={post.votesCount}
        initialHasVoted={post.hasVoted}
      />
    </li>
  );
};

export default CardPost;
