import React from "react";

const TextField = ({ label, placeholder, value, onChange, type, name }) => {
  return (
    <div className="flex flex-col gap-3 w-full">
      <label htmlFor={name} className="font-semibold text-secondary">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="px-4 py-3 rounded-xl bg-background border border-secondary text-sm text-secondary placeholder:text-secondary focus:outline-none focus:ring-2 focus:ring-primary transition duration-200"
      />
    </div>
  );
};

export default TextField;
