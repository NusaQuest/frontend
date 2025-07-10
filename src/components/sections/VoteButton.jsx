import { Circle, ThumbsDown, ThumbsUp } from "lucide-react";
import React from "react";

const VoteButton = ({ now, quest, onVote }) => {
  return (
    <div>
      {/* {now > quest.voteStart && now <= quest.voteEnd && ( */}
        <div className="w-full flex flex-col lg:flex-row gap-2.5 my-3">
          <button
            onClick={() => onVote(0)}
            className="rounded-xl active:scale-95 duration-200 flex items-center justify-center p-3 flex-row gap-1.5 bg-green-500 hover:bg-green-600 cursor-pointer w-full"
          >
            <ThumbsUp className="text-secondary size-5" />
            <h1 className="text-secondary font-semibold">
              For <span>{"(" + 123 + ")"}</span>
            </h1>
          </button>
          <button className="rounded-xl active:scale-95 duration-200 flex items-center justify-center p-3 flex-row gap-1.5 bg-red-500 hover:bg-red-600 cursor-pointer w-full">
            <ThumbsDown className="text-secondary size-5" />
            <h1
              onClick={() => onVote(1)}
              className="text-secondary font-semibold"
            >
              Against <span>{"(" + 12 + ")"}</span>{" "}
            </h1>
          </button>
          <button
            onClick={() => onVote(2)}
            className="rounded-xl active:scale-95 duration-200 flex items-center justify-center p-3 flex-row gap-1.5 bg-yellow-500 hover:bg-yellow-600 cursor-pointer w-full"
          >
            <Circle className="text-secondary size-5" />
            <h1 className="text-secondary font-semibold">
              Neutral <span>{"(" + 120 + ")"}</span>{" "}
            </h1>
          </button>
        </div>
      {/* )} */}
    </div>
  );
};

export default VoteButton;
