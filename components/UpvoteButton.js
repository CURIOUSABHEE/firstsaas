"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export default function UpvoteButton({
  postId,
  initialVotesCount = 0,
  initialHasVoted = false,
}) {
  const [isVoting, setIsVoting] = useState(false);
  const [votesCount, setVotesCount] = useState(initialVotesCount);
  const [hasVoted, setHasVoted] = useState(initialHasVoted);

  const handleVote = async () => {
    if (isVoting) return;

    setIsVoting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const method = hasVoted ? "DELETE" : "POST";
      // await axios[method.toLowerCase()](`/api/vote?postId=${postId}`);

      if (!hasVoted) {
        setVotesCount((current) => current + 1);
        toast.success("Upvoted");
      } else {
        setVotesCount((current) => current - 1);
        toast.error("Removed upvote");
      }

      setHasVoted(!hasVoted);
    } catch (error) {
      console.error("Failed to vote. Please try again.");
    } finally {
      setIsVoting(false);
    }
  };

  const formatVoteCount = (count) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  return (
    <button
      onClick={handleVote}
      disabled={isVoting}
      aria-label={hasVoted ? "Remove upvote" : "Upvote post"}
      className={`
        relative group transition-all duration-150 ease-out
        w-12 h-12 rounded border flex flex-col items-center justify-center gap-0.5
        ${
          isVoting
            ? "bg-gray-50 border-gray-200 cursor-not-allowed"
            : hasVoted
              ? "bg-indigo-600 border-indigo-600 text-white"
              : "bg-white border-gray-300 text-gray-600 hover:border-gray-400 hover:bg-gray-50"
        }
      `}
    >
      {isVoting ? (
        <div className="w-3 h-3 border border-gray-400 border-t-transparent rounded-full animate-spin"></div>
      ) : (
        <>
          <svg
            className="w-4 h-4"
            fill={hasVoted ? "currentColor" : "none"}
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 15l7-7 7 7"
            />
          </svg>
          <span className="text-xs font-medium leading-none">
            {formatVoteCount(votesCount)}
          </span>
        </>
      )}
    </button>
  );
}
