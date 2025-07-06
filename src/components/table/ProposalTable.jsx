import React from "react";
import { Link } from "react-router-dom";

const ProposalTable = ({ proposals, onCancel, onQueue, onExecute }) => {
  const now = Date.now() / 1000;

  const getStatus = (item) => {
    if (now < item.voteStart) return "Upcoming";
    if (now >= item.voteStart && now <= item.voteEnd) return "Voting";
    if (now > item.voteEnd && now < item.executionDelay) return "Pending";
    if (now >= item.executionDelay) return "Executed";
    return "Unknown";
  };

  const statusColors = {
    Upcoming: "bg-purple-100 text-purple-800",
    Voting: "bg-yellow-100 text-yellow-800",
    Pending: "bg-orange-100 text-orange-800",
    Executed: "bg-green-100 text-green-800",
    Unknown: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="bg-white/10 text-secondary">
            <th className="px-4 py-3">Quest Name</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {proposals.map((item, index) => {
            const status = getStatus(item);

            return (
              <tr
                key={index}
                className="border-t border-white/10 hover:bg-white/5 transition"
              >
                <td className="px-4 py-3 text-secondary font-medium">
                  <Link
                    to={`/quest/${item.id}`}
                    className="hover:underline cursor-pointer transition"
                  >
                    {item.name}
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
                  {status === "Upcoming" && (
                    <button
                      onClick={() => onCancel(item)}
                      className="text-red-500 hover:underline text-sm font-semibold"
                    >
                      Cancel
                    </button>
                  )}

                  {status === "Pending" && (
                    <button
                      onClick={() => onQueue(item)}
                      className="text-orange-500 hover:underline text-sm font-semibold"
                    >
                      Queue
                    </button>
                  )}

                  {status === "Executed" && (
                    <button
                      onClick={() => onExecute(item)}
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
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProposalTable;
