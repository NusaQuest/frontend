import React from "react";
import { X, Menu } from "lucide-react";
import Logo from "../../assets/nusaquest_logo.png";
import { navs, truncate } from "../../utils/helper";
import xellar from "../../assets/xellar.png";
import { useConnectModal } from "@xellar/kit";
import { useNavigate } from "react-router-dom";

const Navbar = ({ click, action, address }) => {
  const { open } = useConnectModal();
  const navigate = useNavigate();

  return (
    <div className="py-6 relative">
      <div className="flex justify-between items-center">
        <div className="flex flex-row items-center">
          <img src={Logo} className="h-14 w-14" />
          <h1 className="font-bold text-xl cursor-pointer text-primary">
            NusaQuest.
          </h1>
        </div>
        <div className="lg:hidden p-2 rounded-xl bg-primary cursor-pointer shadow-xl duration-200 active:scale-110">
          {click ? (
            <X onClick={action} size={28} color="white" />
          ) : (
            <Menu onClick={action} size={28} color="white" />
          )}
        </div>
        <div className="hidden lg:flex flex-row gap-12 justify-center items-center">
          {navs().map((item, index) => (
            <h1
              key={index}
              className={`font-semibold text-lg text-secondary cursor-pointer`}
              onClick={() => {
                navigate(`${item.destination}`);
              }}
            >
              {item.title}
            </h1>
          ))}
        </div>
        <div className="hidden lg:flex">
          <button
            onClick={open}
            className="bg-primary rounded-xl lg:rounded-2xl p-2 duration-200 cursor-pointer hover:scale-105"
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

export default Navbar;
