import React from "react";
import { navs } from "../../utils/helper";

const Footer = () => {
  return (
    <div className="border-t border-gray-300">
      <div className="text-base lg:text-lg flex flex-col gap-3 py-8">
        <p className="text-secondary">
          <span className="text-primary font-semibold">
            © <a href="#">NusaQuest</a>
          </span>{" "}
          2025, All rights reserved.
        </p>

        <p className="text-sm lg:text-base text-secondary">
          A community-driven movement to clean Indonesia’s beaches, powered by
          NUSA, NFTs, and real-world action.
        </p>
      </div>
    </div>
  );
};

export default Footer;
