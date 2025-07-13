import { Circle, ThumbsDown, ThumbsUp } from "lucide-react";
import React from "react";

const VoteButton = ({ onVote, totalFor, totalAgainst, disabled }) => {
  return (
    <div>
      <div className="w-full flex flex-col lg:flex-row gap-2.5 my-3">
        <button
          disabled={disabled}
          onClick={() => onVote(1, "I'm For")}
          className={`rounded-xl active:scale-95 duration-200 flex items-center justify-center p-3 flex-row gap-1.5 w-full
    ${
      disabled
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-green-500 hover:bg-green-600 cursor-pointer"
    }
  `}
        >
          <ThumbsUp className="text-secondary size-5" />
          <h1 className="text-secondary font-semibold">
            For <span>{"(" + totalFor + ")"}</span>
          </h1>
        </button>
        <button
          disabled={disabled}
          onClick={() => onVote(0, "I'm Against")}
          className={`rounded-xl active:scale-95 duration-200 flex items-center justify-center p-3 flex-row gap-1.5 w-full
    ${
      disabled
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-red-500 hover:bg-red-600 cursor-pointer"
    }
  `}
        >
          <ThumbsDown className="text-secondary size-5" />
          <h1 className="text-secondary font-semibold">
            Against <span>{"(" + totalAgainst + ")"}</span>
          </h1>
        </button>
      </div>
    </div>
  );
};

export default VoteButton;
