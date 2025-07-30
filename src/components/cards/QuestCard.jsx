import React, { useEffect, useState } from "react";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getProposalId, state } from "../../services/proposal";
import { mapStateToStatus, statusColors } from "../../utils/helper";

const QuestCard = ({ item }) => {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Loading");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const proposalId = await getProposalId(item);
        const proposalState = await state(proposalId);
        const statusText = mapStateToStatus(proposalState);
        setStatus(statusText);
      } catch (err) {
        console.error("Failed to get status:", err);
        setStatus("Unknown");
      }
    };

    fetchStatus();
  }, [item]);

  const handleNavigate = (id) => {
    navigate("/quest/" + id);
  };

  return (
    <div
      onClick={() => handleNavigate(item.id)}
      className="relative bg-white/5 border border-white/10 backdrop-blur-md rounded-xl flex flex-col 
        hover:scale-[1.02] hover:outline-primary hover:outline-2 
        active:scale-95 transition-all duration-200 shadow-lg cursor-pointer"
    >
      <div
        className={`absolute top-3 right-3 z-10 text-xs font-semibold px-3 py-1 rounded-md ${statusColors[status]}`}
      >
        {status}
      </div>
      <div className="relative w-full h-48">
        <img
          src={item.images[0]}
          alt="Quest Preview"
          className="w-full h-full object-cover rounded-t-xl"
        />
        <div className="absolute inset-0 rounded-t-xl bg-black/20 opacity-0 hover:opacity-100 transition" />
      </div>
      <div className="p-4 flex flex-col gap-3">
        <div className="flex flex-col gap-0.5">
          <h2 className="text-lg font-bold text-secondary">
            {item.proposalname}
          </h2>
          <a
            href={item.maps}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs italic text-secondary hover:underline"
          >
            <MapPin size={14} className="text-primary" />
            {item.rivername}, {item.city}, {item.province}
          </a>
        </div>
        <p className="text-sm text-secondary line-clamp-2">
          {item.proposaldescription}
        </p>
      </div>
    </div>
  );
};

export default QuestCard;
