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
        paragraph="Join cleanups across Indonesia, earn NUSA tokens, and help protect rivers before they pollute our oceans."
      />
      <PageSection datas={proposals} type="quest" title={"Explore Quests"} />
    </div>
  );
};

export default Quest;
