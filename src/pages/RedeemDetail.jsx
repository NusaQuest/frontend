import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { nfts } from "./Redeem";
import { BadgePercent, Sparkles, Flame, PackageCheck } from "lucide-react";
import Title from "../components/sections/Title";
import RedeemImage from "../components/sections/RedeemImage";
import NFTDetail from "../components/sections/NFTDetail";
import NFTDescription from "../components/sections/NFTDescription";
import NFTMetadata from "../components/sections/NFTMetadata";
import ReusableButton from "../components/buttons/ReusableButton";

const RedeemDetail = () => {
  const { id } = useParams("id");
  const [nft, setNft] = useState(null);

  useEffect(() => {
    if (nfts && id) {
      const foundNft = nfts.find((item) => String(item.id) === String(id));
      setNft(foundNft);
    }
  }, [id]);

  const handleRedeem = (id) => {
    console.log("Redeem NFT with ID:", id);
  };

  if (!nft) return <div className="text-secondary">Loading...</div>;

  const isSoldOut = nft.purchased >= nft.stock;

  return (
    <div className="lg:mt-8">
      <Title title={nft.name} />
      <div className="flex flex-col lg:flex-row space-x-8">
        <div className="lg:w-1/2">
          <RedeemImage nft={nft} />
        </div>
        <div className="lg:w-1/2">
          <NFTDetail nft={nft} />
          <NFTDescription nft={nft} />
          <NFTMetadata nft={nft} />
          {isSoldOut ? (
            <ReusableButton
              text="Sold Out"
              buttonColor={"bg-gray-600"}
              textColor={"text-gray-300"}
            />
          ) : (
            <ReusableButton
              text="Redeem"
              action={handleRedeem}
              buttonColor={"bg-primary"}
              textColor={"text-secondary"}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RedeemDetail;
