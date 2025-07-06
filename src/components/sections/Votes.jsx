import React from "react";
import Title from "./Title";
import VoteTable from "../table/VoteTable";

const Votes = ({ proposals }) => {
  return (
    <div>
      <div className="mt-6">
        <Title title={"My Votes"} />
        <VoteTable proposals={proposals} />
      </div>
    </div>
  );
};

export default Votes;
