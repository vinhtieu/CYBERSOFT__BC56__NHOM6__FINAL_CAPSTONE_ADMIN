import React from "react";

export default function Button({ children, classNameProps, onClickEvent }) {
  const handleClick = (e) => {
    e.preventDefault();
    onClickEvent();
  };

  return (
    <button
      onClick={handleClick}
      className={` py-2 px-4 rounded-md font-semibold text-base border border-slate-300
    md:mt-0 md:order-1 ${classNameProps}`}>
      {children}
    </button>
  );
}
