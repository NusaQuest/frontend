import React from "react";
import { Menu } from "lucide-react";

const Navbar = () => {
  return (
    <div className="py-6">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-xl text-terracotta">NusaQuest.</h1>
        <div
          className="p-2 rounded-xl bg-terracotta cursor-pointer shadow-xl"
        >
          <Menu size={28} color="white" />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
