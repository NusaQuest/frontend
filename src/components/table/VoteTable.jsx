import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProposalId, userVoteHistory, vote } from "../../services/proposal";
import VoteRow from "../row/VoteRow";

const VoteTable = ({ proposals, address }) => {
  const [voteHistory, setVoteHistory] = useState(null);

  const fetchVoteHistory = async () => {
    const voteHistory = await userVoteHistory(address);
    setVoteHistory(voteHistory);
    console.log(voteHistory);
  };

  useEffect(() => {
    fetchVoteHistory();
  }, [proposals, address]);

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
          {proposals &&
          proposals.length > 0 &&
          voteHistory &&
          voteHistory.length > 0 ? (
            proposals.map((item, index) => {
              return (
                <VoteRow
                  key={index}
                  proposal={item}
                  voteHistory={voteHistory}
                />
              );
            })
          ) : (
            <tr>
              <td
                colSpan={3}
                className="text-center text-gray-400 py-4 text-lg lg:text-xl"
              >
                No proposals found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default VoteTable;
