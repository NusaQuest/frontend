import React from "react";
import { Link } from "react-router-dom";

const CleanupTable = ({ proposals, onView }) => {
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
          {proposals && proposals.length > 0 ? (
            proposals.map((item, index) => {
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
                      className={`text-xs px-2 py-1 rounded-md font-semibold`}
                    >
                      <button
                        onClick={() => onView(item)}
                        className="text-blue-500 hover:underline text-sm font-semibold"
                      >
                        View
                      </button>
                    </span>
                  </td>
                </tr>
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

export default CleanupTable;
