import React from "react";
import QuestCard from "../cards/QuestCard";
import NFTCard from "../cards/NFTCard";
import Title from "./Title";
import HistoryCard from "../cards/HistoryCard";

const PageSection = ({ datas, type, title }) => {
  return (
    <div>
      <Title title={title} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {type === "quest" &&
          datas.map((item, index) => <QuestCard key={index} item={item} />)}

        {type === "redeem" &&
          datas.map((item, index) => <NFTCard key={index} item={item} />)}

        {type === "history" &&
          datas.map((item, index) => <HistoryCard key={index} item={item} />)}
      </div>
    </div>
  );
};

export default PageSection;
