import React from "react";
import Header from "../components/sections/Header";
import OverviewImpact from "../components/sections/OverviewImpact";

const Impact = () => {
  return (
    <div>
      <Header
        firstText="Your"
        boldText="NusaQuest"
        secondText="Journey"
        paragraph="Every proposal, vote, and quest tells your story. Review your journey in building a better future."
      />
      <OverviewImpact totalProposals={10} totalVotes={20} totalActions={10} />
    </div>
  );
};

export default Impact;
