import React from "react";
import { navs } from "../../utils/helper";

const NavMenu = ({ action, registered }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-4 justify-center items-center">
      {navs().map((item, index) => {
        // Jika user sudah register dan item adalah "Register", jangan render apa pun
        if (registered && item.title.toLowerCase() === "register") {
          return null;
        }

        return (
          <h1
            key={index}
            className="font-semibold text-4xl text-secondary cursor-pointer"
            onClick={() => action(item)}
          >
            {item.title}
          </h1>
        );
      })}
    </div>
  );
};

export default NavMenu;
