import React from "react";
import { FileText, CheckCircle, Activity } from "lucide-react";
import Title from "./Title";
import CountUp from "react-countup"; // ← Import

const OverviewImpact = ({ totalProposals, totalVotes, totalActions }) => {
  const items = [
    {
      label: "Quests Created",
      value: totalProposals,
      icon: <FileText size={28} className="text-primary" />,
    },
    {
      label: "Votes Cast",
      value: totalVotes,
      icon: <CheckCircle size={28} className="text-yellow-500" />,
    },
    {
      label: "Quests Executed",
      value: totalActions,
      icon: <Activity size={28} className="text-green-500" />,
    },
  ];

  return (
    <div>
      <Title title={"Overview"} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="bg-white/5 border duration-200 border-white/10 rounded-2xl p-4 backdrop-blur-md shadow-lg flex items-center gap-4"
          >
            <div className="p-3 bg-white/10 rounded-full">{item.icon}</div>
            <div>
              <h2 className="text-2xl font-bold text-secondary">
                <CountUp end={item.value} duration={5} />{" "}
              </h2>
              <p className="text-sm text-secondary">{item.label}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewImpact;
