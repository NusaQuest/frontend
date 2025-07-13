import React from "react";
import Title from "./Title";
import ProposalTable from "../table/ProposalTable";

const Proposals = ({ proposals, onAction }) => {
  return (
    <div>
      <div className="mt-6">
        <Title title={"My Quests"} needCreate={true} onClick={onAction} />
        <ProposalTable proposals={proposals} />
      </div>
    </div>
  );
};

export default Proposals;
