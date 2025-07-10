import React from "react";
import Title from "./Title";
import { BadgePercent, Flame, PackageCheck, Sparkles } from "lucide-react";

const NFTMetadata = ({ nft }) => {
  return (
    <div>
      <Title title={"Metadata"} />

      <div className="flex flex-wrap gap-2 mb-4">
        {nft.attributes.map((attr, index) => (
          <div
            key={index}
            className="px-3 py-1 rounded-full bg-white/10 text-xs lg:text-sm text-secondary flex items-center gap-1"
          >
            {attr.trait_type === "Rarity" && <Sparkles className="size-3" />}
            {attr.trait_type === "Aura" && <Flame className="size-3" />}
            {attr.trait_type === "Tool" && <PackageCheck className="size-3" />}
            {attr.trait_type === "Background" && (
              <BadgePercent className="size-3" />
            )}
            <span className="font-medium">{attr.trait_type}:</span> {attr.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NFTMetadata;
