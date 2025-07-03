import React from "react";
import xellar from "../../assets/xellar.png";

const HeroSection = () => {
  return (
    <div className="flex justify-center items-center min-h-[90vh]">
      <div className="">
        <h1 className="text-secondary text-center font-bold text-5xl mb-2">
          <span className="text-primary">Beaches </span>
          aren’t gonna <span className="text-primary">clean </span> themselves.
        </h1>
        <p className="font-thin text-secondary text-center text-xs">
          NusaQuest is a platform powered by AI and DAO, where you can join real
          beach cleanups across Indonesia and earn $NUSA tokens — redeemable for
          concert tickets NFT.
        </p>
        <div className="w-full flex items-center justify-center mt-6">
          <button className="bg-primary rounded-xl p-2">
            <div className="flex flex-row items-center">
              <img src={xellar} className="h-8 w-8" />
              <h1 className="font-bold text-secondary">Connect Wallet</h1>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
