import React from "react";
import { MapPin } from "lucide-react";

const QuestCard = ({ item }) => {
  const now = Date.now() / 1000;

  let status = "Unknown";
  if (now < item.voteStart) {
    status = "Upcoming";
  } else if (now >= item.voteStart && now <= item.voteEnd) {
    status = "Voting";
  } else if (now > item.voteEnd && now < item.executionDelay) {
    status = "Pending";
  } else if (now >= item.executionDelay) {
    status = "Executed";
  }

  const statusColors = {
    Unknown: "bg-primary text-secondary",
    Upcoming: "bg-purple-100 text-purple-800",
    Voting: "bg-yellow-100 text-yellow-800",
    Pending: "bg-orange-100 text-orange-800",
    Executed: "bg-green-100 text-green-800",
  };

  const statusIcons = {
    Unknown: "❔",
    Upcoming: "⏳",
    Voting: "🗳️",
    Pending: "🕒",
    Executed: "✅",
  };

  return (
    <div
      className="relative bg-white/5 border border-white/10 backdrop-blur-md rounded-xl flex flex-col 
        hover:scale-[1.02] hover:outline-primary hover:outline-2 
        active:scale-95 transition-all duration-200 shadow-lg cursor-pointer"
    >
      <div
        className={`absolute top-3 right-3 z-10 text-xs font-semibold px-3 py-1 rounded-md ${statusColors[status]}`}
      >
        {statusIcons[status]} {status}
      </div>
      <div className="relative w-full h-48">
        <img
          src={item.images[0]}
          alt="Quest Preview"
          className="w-full h-full object-cover rounded-t-xl"
        />
        <div className="absolute inset-0 rounded-t-xl bg-black/20 opacity-0 hover:opacity-100 transition" />
      </div>
      <div className="px-4 pb-4 pt-2 flex flex-col gap-3">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-lg font-bold text-secondary">{item.name}</h2>
          <a
            href={item.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs italic text-secondary hover:underline"
          >
            <MapPin size={14} className="text-primary" />
            {item.beachName}, {item.city}, {item.province}
          </a>
        </div>
        <p className="text-sm text-secondary line-clamp-2">
          {item.proposalDescription}
        </p>
      </div>
    </div>
  );
};

export default QuestCard;
