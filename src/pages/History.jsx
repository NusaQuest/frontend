import React from "react";
import Header from "../components/sections/Header";
import PageSection from "../components/sections/PageSection";

const histories = [
  {
    id: "64f6c2e0a29b3c001c7d9f0a",
    wallet: "0xabcDEFabcDEFabcDEFabcDEFabcDEFabcDEF1234",
    title: "Voted on Proposal #3",
    detail: "+15 $NUSA",
    txHash:
      "0x111aaabbbcccddeeff00112233445566778899aabbccddeeff00112233445566",
    txTimestamp: 1751880000,
  },
  {
    id: "64f6c2e0a29b3c001c7d9f0b",
    wallet: "0xabcDEFabcDEFabcDEFabcDEFabcDEFabcDEF1234",
    title: "Verified KTP",
    detail: "+10 $NUSA",
    txHash:
      "0x222aaabbbcccddeeff00112233445566778899aabbccddeeff00112233445577",
    txTimestamp: 1751774000,
  },
  {
    id: "64f6c2e0a29b3c001c7d9f0c",
    wallet: "0xabcDEFabcDEFabcDEFabcDEFabcDEFabcDEF1234",
    title: "Executed Quest: Kuta Beach",
    detail: "+60 $NUSA",
    txHash:
      "0x333aaabbbcccddeeff00112233445566778899aabbccddeeff00112233445588",
    txTimestamp: 1751999999,
  },
];

const History = () => {
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
