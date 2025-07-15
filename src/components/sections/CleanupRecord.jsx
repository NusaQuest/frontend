import React from "react";
import Title from "./Title";
import CleanupTable from "../table/CleanupTable";

const CleanupRecord = ({ proposals, address }) => {
  return (
    <div>
      <div className="mt-6">
        <Title title={"Cleanup Records"} />
        <CleanupTable proposals={proposals} address={address} />
      </div>
    </div>
  );
};

export default CleanupRecord;
