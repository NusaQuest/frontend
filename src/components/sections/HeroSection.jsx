import React from "react";
import xellar from "../../assets/xellar.png";
import nft from "../../assets/nft.png";
import { useConnectModal } from "@xellar/kit";
import { truncate } from "../../utils/helper";

const HeroSection = ({ address }) => {
  const { open } = useConnectModal();
  return (
    <div className="flex justify-center items-center min-h-[90vh]">
      <div className="lg:flex px-4 py-8 justify-center items-center">
        <div className="lg:w-1/2">
          <h1 className="text-secondary text-center lg:text-left font-bold text-5xl lg:text-6xl mb-4 leading-tight">
            Turn <span className="text-primary">River </span>
            Cleanups into <span className="text-primary">NFT Concert </span>
            Tickets
          </h1>
          <p className="text-secondary text-center lg:text-left font-light text-sm sm:text-base lg:text-lg max-w-xl">
            NusaQuest is an AI and DAO-powered platform where cleaning rivers
            earns you NUSA tokens — redeemable for exclusive concert ticket
            NFTs. Clean rivers, stop ocean trash, and get rewarded.
          </p>
        </div>
        <div className="flex justify-center lg:w-1/2">
          <img
            src={nft}
            className="lg:flex lg:w-screen hidden"
            alt="NFT Concert Ticket"
          />
        </div>

        <div className="w-full lg:hidden flex items-center justify-center mt-6 lg:mt-0">
          <button
            onClick={open}
            className="bg-primary rounded-xl p-2 duration-200 cursor-pointer hover:scale-105 lg:hidden"
          >
            <div className="flex flex-row items-center">
              <img src={xellar} className="h-8 w-8" />
              <h1 className="font-bold text-secondary">
                {address ? truncate(address, 4, 4, 11) : `Connect Wallet`}
              </h1>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
