import React, { useEffect, useState } from "react";
import Header from "../components/sections/Header";
import PageSection from "../components/sections/PageSection";
import { balanceOf } from "../services/ft";
import { getNFTs } from "../server/nft";

const Redeem = ({ address }) => {
  const [balance, setBalance] = useState(0);
  const [nfts, setNfts] = useState(null);

  const fetchBalance = async () => {
    if (!address) return;

    const balance = await balanceOf(address);
    setBalance(balance);
  };

  const fetchNFTs = async () => {
    const result = await getNFTs();
    setNfts(result.data.nfts);
  };

  useEffect(() => {
    fetchBalance();
  }, [address, balance]);

  useEffect(() => {
    fetchNFTs();
  }, []);

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
