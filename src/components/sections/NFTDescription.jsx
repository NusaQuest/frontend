import React from "react";
import Title from "./Title";

const NFTDescription = ({ nft }) => {
  return (
    <div>
      <Title title={"Description"} />
      <p className="text-sm lg:text-base italic text-secondary mb-4">{nft.description}</p>
    </div>
  );
};

export default NFTDescription;
