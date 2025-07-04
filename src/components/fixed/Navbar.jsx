import React from "react";
import { X, Menu } from "lucide-react";
import NavMenu from "./NavMenu";

const Navbar = ({ click, action }) => {
  return (
    <div className="py-6 relative">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl cursor-pointer text-primary">
          NusaQuest.
        </h1>
        <div className="p-2 rounded-xl bg-primary cursor-pointer shadow-xl duration-200 active:scale-110">
          {click ? (
            <X onClick={action} size={28} color="white" />
          ) : (
            <Menu onClick={action} size={28} color="white" />
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
