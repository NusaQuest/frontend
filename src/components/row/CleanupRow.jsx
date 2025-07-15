import React from "react";
import { Link } from "react-router-dom";

const CleanupRow = ({ proposal, onView }) => {
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
        <span className={`text-xs px-2 py-1 rounded-md font-semibold`}>
          <button
            onClick={() => onView(proposal)}
            className="text-blue-500 hover:underline text-sm font-semibold"
          >
            View
          </button>
        </span>
      </td>
    </tr>
  );
};

export default CleanupRow;
