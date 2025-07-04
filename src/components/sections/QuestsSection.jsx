import React from "react";
import QuestCard from "../cards/QuestCard";

const QuestsSection = ({ quests }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {quests.map((item, index) => (
        <QuestCard item={item} />
      ))}
    </div>
  );
};

export default QuestsSection;
