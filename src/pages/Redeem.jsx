import React, { useEffect, useState } from "react";
import Header from "../components/sections/Header";
import PageSection from "../components/sections/PageSection";
import { balanceOf } from "../services/ft";

export const nfts = [
  {
    name: "Nusa Warrior #0123",
    image:
      "https://puspapknstan.org/wp-content/uploads/2023/09/Website_Perstaxtive-15-1024x576.png",
    description:
      "A legendary beach guardian NFT from the NusaQuest series, protecting the ocean with honor.",
    attributes: [
      { trait_type: "Background", value: "Sunset Beach" },
      { trait_type: "Weapon", value: "Coral Spear" },
      { trait_type: "Rarity", value: "Epic" },
    ],
    price: 60,
    id: "123",
    stock: 100,
    purchased: 34,
  },
  {
    name: "Wave Cleaner #0456",
    image:
      "https://puspapknstan.org/wp-content/uploads/2023/09/Website_Perstaxtive-15-1024x576.png",
    description:
      "This NFT represents a hero who leads massive cleanup quests in Java’s coastline.",
    attributes: [
      { trait_type: "Background", value: "Clear Waters" },
      { trait_type: "Tool", value: "Net of Purity" },
      { trait_type: "Rarity", value: "Rare" },
    ],
    price: 45,
    id: "456",
    stock: 80,
    purchased: 67,
  },
  {
    name: "Guardian of Bali #0789",
    image:
      "https://puspapknstan.org/wp-content/uploads/2023/09/Website_Perstaxtive-15-1024x576.png",
    description:
      "Summoned from Balinese legends, this NFT guards the sacred shores.",
    attributes: [
      { trait_type: "Background", value: "Temple Coast" },
      { trait_type: "Aura", value: "Sacred Flame" },
      { trait_type: "Rarity", value: "Legendary" },
    ],
    price: 100,
    id: "789",
    stock: 50,
    purchased: 50,
  },
];

const Redeem = ({ address }) => {
  const [balance, setBalance] = useState(0);

  const fetchBalance = async () => {
    if (!address) return;

    const balance = await balanceOf(address);
    setBalance(balance);
  };

  useEffect(() => {
    fetchBalance();
  }, [address, balance]);

  return (
    <div>
      <Header
        firstText="Your"
        boldText="Concert"
        secondText="Pass Awaits"
        paragraph={`You have ${balance} NUSA tokens — redeem them now for NFT concert tickets. Join the crowd before it’s gone!`}
      />
      <PageSection datas={nfts} type="redeem" title={"Claimable NFTs"} />
    </div>
  );
};

export default Redeem;
