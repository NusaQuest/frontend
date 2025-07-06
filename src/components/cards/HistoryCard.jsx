import React from "react";
import { Clock, Link as LinkIcon } from "lucide-react";
import { format } from "date-fns";

const HistoryCard = ({ item }) => {
  const date = new Date(item.txTimestamp * 1000); // Convert Unix to JS Date
  const formattedDate = format(date, "dd MMM yyyy • HH:mm");

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 shadow-md backdrop-blur-md flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h2 className="text-base font-semibold text-secondary">{item.title}</h2>
        <span
          className={`text-sm font-semibold ${
            item.detail.includes("+")
              ? "text-green-400"
              : item.detail.includes("-")
              ? "text-red-400"
              : "text-secondary"
          }`}
        >
          {item.detail}
        </span>
      </div>

      <div className="flex items-center gap-2 text-xs text-secondary/80">
        <Clock size={14} />
        <span>{formattedDate}</span>
      </div>

      <div className="flex items-center gap-2 text-xs text-primary hover:underline cursor-pointer">
        <LinkIcon size={14} />
        <a
          href={`https://sepolia.etherscan.io/tx/${item.txHash}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on Explorer
        </a>
      </div>
    </div>
  );
};

export default HistoryCard;
