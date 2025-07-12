import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProposalId, state } from "../../services/proposal";

const ProposalRow = ({ proposal }) => {
  const [status, setStatus] = useState("Loading");

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const proposalId = await getProposalId(proposal);
        const proposalState = await state(proposalId);
        const statusText = mapStateToStatus(proposalState);
        setStatus(statusText);
      } catch (err) {
        console.error("Failed to get status:", err);
        setStatus("Unknown");
      }
    };

    fetchStatus();
  }, [proposal]);

  const mapStateToStatus = (state) => {
    switch (state) {
      case 0:
        return "Pending";
      case 1:
        return "Active";
      case 2:
        return "Canceled";
      case 3:
        return "Defeated";
      case 4:
        return "Succeeded";
      case 5:
        return "Queued";
      case 6:
        return "Expired";
      case 7:
        return "Executed";
      default:
        return "Unknown";
    }
  };

  const statusColors = {
    Pending: "bg-orange-100 text-orange-800",
    Active: "bg-blue-100 text-blue-800",
    Canceled: "bg-red-100 text-red-800",
    Defeated: "bg-red-100 text-red-800",
    Succeeded: "bg-green-100 text-green-800",
    Queued: "bg-indigo-100 text-indigo-800",
    Expired: "bg-gray-100 text-gray-800",
    Executed: "bg-green-100 text-green-800",
    Unknown: "bg-gray-100 text-gray-800",
  };

  return (
    <tr className="border-t border-white/10 hover:bg-white/5 transition">
      <td className="px-4 py-3 text-secondary font-medium">
        <Link
          to={`/quest/${proposal.id}`}
          className="hover:underline cursor-pointer transition"
        >
          {proposal.proposalname}
        </Link>
      </td>
      <td className="px-4 py-3">
        <span
          className={`text-xs px-2 py-1 rounded-md font-semibold ${statusColors[status]}`}
        >
          {status}
        </span>
      </td>
      <td className="px-4 py-3">
        {(status === "Pending" ||
          status === "Canceled" ||
          status === "Defeated" ||
          status === "Expired" ||
          status === "Unknown") && (
          <button className="text-secondary text-sm font-semibold">-</button>
        )}

        {status === "Pending" && (
          <button
            onClick={() => onQueue(proposal)}
            className="text-orange-500 hover:underline text-sm font-semibold"
          >
            Queue
          </button>
        )}

        {status === "Executed" && (
          <button
            onClick={() => onExecute(proposal)}
            className="text-green-500 hover:underline text-sm font-semibold"
          >
            Execute
          </button>
        )}

        {(status === "Voting" || status === "Unknown") && (
          <span className="text-gray-400 text-sm">—</span>
        )}
      </td>
    </tr>
  );
};

export default ProposalRow;
