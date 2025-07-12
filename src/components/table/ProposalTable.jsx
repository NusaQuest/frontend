import React from "react";
import { Link } from "react-router-dom";
import { readContract } from "wagmi/actions";
import { config } from "../../App";
import nusaquest_abi from "../../build/nusaquest_abi.json";
import { NUSAQUEST_ADDRESS } from "../../utils/env";
import { encodeBytes32String } from "ethers";
import ProposalRow from "../row/ProposalRow";

const ProposalTable = ({ proposals, onCancel, onQueue, onExecute }) => {
  const now = Date.now() / 1000;

  // const getStatus = (item) => {
  //   if (now < item.voteStart) return "Upcoming";
  //   if (now >= item.voteStart && now <= item.voteEnd) return "Voting";
  //   if (now > item.voteEnd && now < item.executionDelay) return "Pending";
  //   if (now >= item.executionDelay) return "Executed";
  //   return "Unknown";
  // };

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
          {proposals && proposals.length > 0 ? (
            proposals.map((item, index) => {
              return <ProposalRow key={index} proposal={item} />;
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

export default ProposalTable;
