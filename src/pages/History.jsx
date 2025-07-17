import React, { useEffect, useState } from "react";
import Header from "../components/sections/Header";
import PageSection from "../components/sections/PageSection";
import { getWalletTransactions } from "../server/transaction";

const History = ({ address }) => {
  const [histories, setHistories] = useState(null);

  const fetchHistories = async () => {
    if (!address) return;

    const result = await getWalletTransactions(address);
    if (!result) return;

    setHistories(result.data.transactions.reverse() || []);
  };

  useEffect(() => {
    fetchHistories();
  }, [address]);

  return (
    <div>
      <Header
        firstText="Your"
        boldText="Activity"
        secondText="History"
        paragraph="A simple record of your past actions and transactions within NusaQuest."
      />
      <PageSection datas={histories} type="history" title={"My History"} />
    </div>
  );
};

export default History;
