import React from "react";

export default function SearchBar({
  onInput,
  onSearch,
  onReset,
  classNameProps,
}) {
  return (
    <div
      className={`flex items-center  w-[95%] desktop:mb-0 desktop:w-[350px] bg-white rounded-lg border border-[#cccccc] ${classNameProps}`}
      x-data="{ search: '' }">
      <div className="w-full">
        <input
          type="search"
          className="w-full px-4 py-1 text-gray-800 rounded-full focus:outline-none "
          placeholder="search"
          x-model="search"
          onChange={(e) => {
            const key = e.target.value;
            if (key) {
              onInput(key);
            } else if (key.length === 0) {
              onReset();
            }
          }}
        />
      </div>
      <div>
        <button
          onClick={() => {
            onSearch();
          }}
          type="submit"
          className={`flex items-center  justify-center h-10 w-12 tablet:h-12 text-[#cccccc] rounded-r-lg `}>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
