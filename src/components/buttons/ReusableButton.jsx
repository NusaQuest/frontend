import React from "react";
import { Loader2 } from "lucide-react";

const ReusableButton = ({
  text,
  action,
  textColor,
  buttonColor,
  isOnAction,
}) => {
  return (
    <button
      onClick={() => (typeof action === "function" ? action() : null)}
      className={`${buttonColor} px-3 py-2.5 w-full rounded-xl flex justify-center items-center space-x-2 lg:mt-3 cursor-pointer active:scale-95 duration-200`}
    >
      {isOnAction && <Loader2 className="animate-spin text-secondary" />}
      <h1 className={`font-bold ${textColor}`}>
        {isOnAction ? "Loading..." : text}
      </h1>
    </button>
  );
};

export default ReusableButton;
