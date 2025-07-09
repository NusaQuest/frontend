import React from "react";

const ReusableButton = ({ text, action, textColor, buttonColor }) => {
  return (
    <button
      onClick={() => action}
      className={`${buttonColor} px-3 py-2.5 w-full rounded-xl cursor-pointer active:scale-95 duration-200`}
    >
      <h1 className={`font-bold ${textColor}`}>{text}</h1>
    </button>
  );
};

export default ReusableButton;
