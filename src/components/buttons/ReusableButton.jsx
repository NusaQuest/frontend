import React from "react";

const ReusableButton = ({ text, action }) => {
  return (
    <button
      onClick={() => action}
      className="bg-primary p-3 w-full rounded-xl cursor-pointer duration-200"
    >
      <h1 className="font-bold text-secondary">{text}</h1>
    </button>
  );
};

export default ReusableButton;
