import React from "react";
import { navs } from "../../utils/helper";

const NavMenu = ({ currentPage, action }) => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      {navs().map((item, index) => (
        <h1
          key={index}
          className={`font-semibold text-4xl ${
            currentPage === item.title ? "text-primary" : "text-secondary"
          }`}
          onClick={() => action(item)}
        >
          {item.title}
        </h1>
      ))}
    </div>
  );
};

export default NavMenu;
