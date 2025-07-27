import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProposalId, proposalEta, state } from "../../services/proposal";
import {
  getCountdown,
  mapStateToStatus,
  statusColors,
} from "../../utils/helper";

const ProposalRow = ({ proposal, onQueue, onExecute }) => {
  const [status, setStatus] = useState("Loading");
  const [isExecutable, setIsExecutable] = useState(false);

  const fetchStatus = async () => {
    const proposalId = await getProposalId(proposal);
    if (!proposalId) return;

    const proposalState = await state(proposalId);
    console.log(proposalState)
    if (!proposalState) return;

    const statusText = mapStateToStatus(proposalState);
    setStatus(statusText);
  };

  const fetchEta = async () => {
    const eta = await proposalEta(proposal);
    const countdown = getCountdown(eta);
    if (
      eta &&
      countdown.days == 0 &&
      countdown.hours == 0 &&
      countdown.minutes == 0 &&
      countdown.seconds == 0
    ) {
      setIsExecutable(true);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, [proposal]);

  useEffect(() => {
    fetchEta();
  }, [status]);

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
          status === "Queued" ||
          status === "Unknown") &&
          !isExecutable && (
            <button className="text-secondary text-sm font-semibold" disabled>
              -
            </button>
          )}

        {status === "Executed" && (
          <button className="text-secondary text-sm font-semibold" disabled>
            -
          </button>
        )}

        {status === "Succeeded" && (
          <button
            onClick={() => onQueue(proposal)}
            className="text-orange-500 hover:underline text-sm font-semibold"
          >
            Queue
          </button>
        )}

        {status === "Queued" && isExecutable && (
          <button
            onClick={() => onExecute(proposal)}
            className="text-green-500 hover:underline text-sm font-semibold"
          >
            Execute
          </button>
        )}
      </td>
    </tr>
  );
};

export default ProposalRow;
