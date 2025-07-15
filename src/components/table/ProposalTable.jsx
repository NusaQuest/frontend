import React from "react";
import ProposalRow from "../row/ProposalRow";

const ProposalTable = ({ proposals, onQueue, onExecute }) => {
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
              return (
                <ProposalRow
                  key={index}
                  proposal={item}
                  onQueue={onQueue}
                  onExecute={onExecute}
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

export default ProposalTable;
