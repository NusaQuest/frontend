import React from "react";
import Title from "./Title";

const RedeemImage = ({ nft }) => {
  return (
    <div>
      <img src={nft.image} alt={nft.name} className="rounded-xl w-full mb-4" />
    </div>
  );
};

export default RedeemImage;
