import React from "react";
import Gift from "../../assets/gift.png";
import Users from "../../assets/users.png";
import Brain from "../../assets/brain.png";
import IdCard from "../../assets/id_card.png";
import Header from "./Header";

const iconMap = {
  gift: Gift,
  users: Users,
  brain: Brain,
  id_card: IdCard,
};

const advantages = [
  {
    advantage: "Impact & Rewards",
    icon: "gift",
    description:
      "Join beach cleanups to earn NUSA tokens and redeem them for concert ticket NFTs.",
  },
  {
    advantage: "DAO-Powered Governance",
    icon: "users",
    description:
      "Propose and vote on cleanup initiatives through a decentralized, transparent system.",
  },
  {
    advantage: "AI-Powered Relevance Detection",
    icon: "brain",
    description:
      "Our AI checks every proposal to ensure it's valid, relevant, and beach-related.",
  },
  {
    advantage: "KTP-Based Registration",
    icon: "id_card",
    description:
      "Onboard securely with OCR-powered KTP verification to keep the ecosystem trusted.",
  },
];

const AdvantageSection = () => {
  return (
    <div>
      <Header
        firstText={"Why Join"}
        boldText={"NusaQuest"}
        secondText={"?"}
        paragraph={
          "Explore the unique benefits of joining Indonesia’s first DAO for beach cleanups — where real action meets real rewards."
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 lg:max-w-6xl mx-auto">
        {advantages.map((item, index) => (
          <div key={index} className="p-4">
            <div className="flex flex-row space-x-4">
              <div className="flex justify-center items-center w-1/3">
                <img src={iconMap[item.icon]} />
              </div>{" "}
              <div className="text-secondary w-2/3">
                <h1 className="text-lg font-bold lg:text-2xl">
                  {item.advantage}
                </h1>
                <p className="text-sm lg:text-base">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdvantageSection;
