import React from "react";
import { Plus } from "lucide-react";

const Title = ({ title, needCreate, onClick }) => {
  return (
    <div>
      {needCreate ? (
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-secondary text-xl mb-4">{title}</h1>
          <Plus onClick={onClick} className="text-secondary" />
        </div>
      ) : (
        <h1 className="font-bold text-secondary text-xl mb-4">{title}</h1>
      )}
    </div>
  );
};

export default Title;
