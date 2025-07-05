import React from "react";
import QuestCard from "../cards/QuestCard";
import NFTCard from "../cards/NFTCard";

const PageSection = ({ datas, type }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {type === "quest" &&
        datas.map((item, index) => <QuestCard key={index} item={item} />)}

      {type === "redeem" &&
        datas.map((item, index) => <NFTCard key={index} item={item} />)}
    </div>
  );
};

export default PageSection;
