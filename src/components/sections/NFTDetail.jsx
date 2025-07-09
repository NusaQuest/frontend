import React from "react";
import Title from "./Title";
import { BadgePercent, PackageCheck } from "lucide-react";

const NFTDetail = ({ nft }) => {
  return (
    <div>
      <Title title={"Detail"} />
      <div className="flex items-center justify-between gap-4 bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md shadow-md mb-4">
        <div className="flex items-center gap-2">
          <BadgePercent className="text-primary size-5" />
          <div className="text-secondary text-sm">
            <p className="text-xs">Price</p>
            <p className="font-bold text-base">{nft.price} $NUSA</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <PackageCheck className="text-green-500 size-5" />
          <div className="text-secondary text-sm">
            <p className="text-xs">Claimed</p>
            <p className="font-bold text-base">
              {nft.purchased} / {nft.stock}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFTDetail;
