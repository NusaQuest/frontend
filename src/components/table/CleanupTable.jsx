import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { userSubmissionHistory } from "../../services/proposal";
import CleanupRow from "../row/CleanupRow";

const CleanupTable = ({ address, proposals, onView }) => {
  const [submissionHistory, setSubmissionHistory] = useState(null);

  const fetchSubmissionHistory = async () => {
    const submissionHistory = await userSubmissionHistory(address);
    setSubmissionHistory(submissionHistory);
    console.log(submissionHistory);
  };

  useEffect(() => {
    fetchSubmissionHistory();
  }, [proposals, address]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm text-left border-collapse">
        <thead>
          <tr className="bg-white/10 text-secondary">
            <th className="px-4 py-3">Quest Name</th>
            <th className="px-4 py-3">Submission</th>
          </tr>
        </thead>
        <tbody>
          {proposals &&
          proposals.length > 0 &&
          submissionHistory &&
          submissionHistory.length > 0 ? (
            proposals.map((item, index) => {
              return <CleanupRow key={index} proposal={item} onView={onView} />;
            })
          ) : (
            <tr>
              <td
                colSpan={3}
                className="text-center text-gray-400 py-4 text-lg lg:text-xl"
              >
                No cleanups found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CleanupTable;
