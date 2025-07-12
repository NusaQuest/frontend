import React from "react";
import QuestCard from "../cards/QuestCard";
import NFTCard from "../cards/NFTCard";
import Title from "./Title";
import HistoryCard from "../cards/HistoryCard";

const PageSection = ({ datas, type, title }) => {
  
  const renderCards = () => {
    if (!datas || datas.length === 0) {
      return (
        <div className="col-span-full text-center text-gray-400 text-lg py-8">
          {type === "quest" && "No quests available at the moment."}
          {type === "redeem" && "No rewards to redeem yet."}
          {type === "history" && "No history records found."}
        </div>
      );
    }

    return datas.map((item, index) => {
      switch (type) {
        case "quest":
          return <QuestCard key={index} item={item} />;
        case "redeem":
          return <NFTCard key={index} item={item} />;
        case "history":
          return <HistoryCard key={index} item={item} />;
        default:
          return null;
      }
    });
  };

  return (
    <div>
      <Title title={title} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {renderCards()}
      </div>
    </div>
  );
};

export default PageSection;
