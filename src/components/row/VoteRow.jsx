import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProposalId } from "../../services/proposal";

const VoteRow = ({ proposal, voteHistory }) => {
  const [vote, setVote] = useState("Loading");
  const voteColors = {
    Against: "bg-red-100 text-red-800",
    For: "bg-green-100 text-green-800",
  };

  const fetchVote = async () => {
    const proposalId = await getProposalId(proposal);
    if (!proposalId) return;

    const searchVoteHistory = voteHistory.find(
      (item) => String(item.proposalId) === String(proposalId)
    );
    console.log(proposalId);
    console.log(voteHistory);
    const side = parseInt(searchVoteHistory.support);
    setVote(side == 0 ? "Against" : "For");
  };

  useEffect(() => {
    fetchVote();
  }, [proposal]);

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
          className={`text-xs px-2 py-1 rounded-md font-semibold ${voteColors[vote]}`}
        >
          {vote}
        </span>
      </td>
    </tr>
  );
};

export default VoteRow;
