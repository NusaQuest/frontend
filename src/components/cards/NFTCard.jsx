import React from "react";
import { Coins, Ticket, Users } from "lucide-react";

const NFTCard = ({ item }) => {
  return (
    <div
      className="bg-white/5 border border-white/10 backdrop-blur-md rounded-xl shadow-lg
        hover:scale-[1.02] hover:outline-primary hover:outline-2 
        active:scale-95 transition-all duration-200 overflow-hidden flex flex-col"
    >
      <img
        src={item.image}
        alt={item.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 flex flex-col gap-3">
        <h2 className="text-lg font-bold text-primary">{item.name}</h2>

        <p className="text-sm text-secondary line-clamp-2">
          {item.description}
        </p>

        <div className="flex justify-between items-center text-sm text-secondary mt-2">
          <div className="flex items-center gap-1">
            <Coins className="w-4 h-4 text-yellow-400" />
            <span>{item.price} $NUSA</span>
          </div>
          <div className="flex items-center gap-1">
            <Ticket className="w-4 h-4 text-green-400" />
            <span>{item.stock} left</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4 text-blue-400" />
            <span>{item.purchased}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTCard;
