import React, { useEffect, useState } from "react";
import Header from "../components/sections/Header";
import PageSection from "../components/sections/PageSection";
import { getProposals } from "../server/proposal";

const Quest = () => {
  const [proposals, setProposals] = useState(null);

  const fetchProposals = async () => {
    const res = await getProposals();
    if (res.status === "success") {
      setProposals(res.data.proposals);
    }
  };

  useEffect(() => {
    fetchProposals();
  }, []);

  return (
    <div>
      <Header
        firstText="Explore"
        boldText="Quests"
        secondText="for Impact"
        paragraph="Join community-driven cleanups across Indonesia. Browse available quests, earn $NUSA tokens, and help restore our beaches."
      />
      <PageSection datas={proposals} type="quest" title={"Explore Quests"} />
    </div>
  );
};

export default Quest;
