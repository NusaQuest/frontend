import React, { useState } from "react";
import Title from "./Title";
import ProposalTable from "../table/ProposalTable";

const Proposals = ({ proposals }) => {
  const [isClicked, setIsClicked] = useState(false);
  const handleOnClick = () => {
    setIsClicked(!isClicked);
  };
  return (
    <div>
      <div className="mt-6">
        <Title
          title={"My Proposals"}
          needCreate={true}
          onClick={handleOnClick}
        />
        <ProposalTable proposals={proposals} />
      </div>
    </div>
  );
};

export default Proposals;
