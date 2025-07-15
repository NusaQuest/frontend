import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProposalId } from "../../services/proposal";

const CleanupRow = ({ proposal, submissionHistory }) => {
  const [proof, setProof] = useState("");

  const fetchSubmission = async () => {
    const proposalId = await getProposalId(proposal);
    if (!proposalId) return;

    const searchSubmissionHistory = submissionHistory.find(
      (item) => String(item.proposalId) === String(proposalId)
    );
    console.log(proposalId);
    console.log(submissionHistory);
    if (searchSubmissionHistory) {
      setProof(searchSubmissionHistory.proof);
    }
  };

  useEffect(() => {
    fetchSubmission();
  }, [proposal]);

  return (
    <>
      {proof && (
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
              <a
                href={proof}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline text-sm md:text-base font-semibold"
              >
                View
              </a>
            </span>
          </td>
        </tr>
      )}
    </>
  );
};

export default CleanupRow;
