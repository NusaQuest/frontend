import React from "react";
import xellar from "../../assets/xellar.png";
import { useConnectModal } from "@xellar/kit";
import { truncate } from "../../utils/helper";

const HeroSection = ({ address }) => {
  const { open } = useConnectModal();
  return (
    <div className="flex justify-center items-center min-h-[90vh]">
      <div className="">
        <h1 className="text-secondary text-center font-bold text-5xl mb-2">
          <span className="text-primary">Beaches </span>
          aren’t gonna <span className="text-primary">clean </span> themselves.
        </h1>
        <p className="font-thin text-secondary text-center text-xs">
          NusaQuest is an impact-to-earn platform powered by AI and DAO, where
          you can join real beach cleanups across Indonesia and earn $NUSA
          tokens — redeemable for concert tickets NFT.
        </p>
        <div className="w-full flex items-center justify-center mt-6">
          <button
            onClick={open}
            className="bg-primary rounded-xl p-2 duration-200 cursor-pointer hover:scale-105"
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
