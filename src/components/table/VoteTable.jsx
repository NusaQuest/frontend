import React from "react";
import { Link } from "react-router-dom";

const VoteTable = ({ proposals }) => {
  const getStatus = () => {
    const options = ["For", "Against", "Abstain"];
    const randomIndex = Math.floor(Math.random() * options.length);
    return options[randomIndex];
  };
  const voteColors = {
    Against: "bg-red-100 text-red-800",
    For: "bg-green-100 text-green-800",
    Abstain: "bg-gray-100 text-gray-800",
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="bg-white/10 text-secondary">
            <th className="px-4 py-3">Quest Name</th>
            <th className="px-4 py-3">Vote</th>
          </tr>
        </thead>
        <tbody>
          {proposals.map((item, index) => {
            const status = getStatus();

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
                    className={`text-xs px-2 py-1 rounded-md font-semibold ${voteColors[status]}`}
                  >
                    {status}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default VoteTable;
