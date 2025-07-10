import React from "react";

const Header = ({ firstText, secondText, boldText, paragraph }) => {
  return (
    <div className="text-secondary text-center mb-6">
      <h1 className="font-bold text-3xl mb-2 lg:text-5xl">
        {firstText} <span className="text-primary">{boldText} </span>
        {secondText}
      </h1>
      <p className="text-sm lg:text-lg">{paragraph}</p>
    </div>
  );
};

export default Header;
