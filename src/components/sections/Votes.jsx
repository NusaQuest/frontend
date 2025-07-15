import React from "react";
import Title from "./Title";
import VoteTable from "../table/VoteTable";

const Votes = ({ proposals, address }) => {
  return (
    <div>
      <div className="mt-6">
        <Title title={"My Votes"} />
        <VoteTable proposals={proposals} address={address} />
      </div>
    </div>
  );
};

export default Votes;
