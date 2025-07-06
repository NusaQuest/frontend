import React from "react";
import Title from "./Title";
import CleanupTable from "../table/CleanupTable";

const CleanupRecord = ({ proposals }) => {
  return (
    <div>
      <div className="mt-6">
        <Title title={"Cleanup Records"} />
        <CleanupTable proposals={proposals} />
      </div>
    </div>
  );
};

export default CleanupRecord;
