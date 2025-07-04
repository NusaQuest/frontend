import React from "react";

const Header = ({ firstText, secondText, boldText, paragraph }) => {
  return (
    <div className="text-secondary text-center mb-6">
      <h1 className="font-bold text-3xl mb-2">
        {firstText} <span className="text-primary">{boldText} </span>
        {secondText}
      </h1>
      <p className="text-sm">{paragraph}</p>
    </div>
  );
};

export default Header;
