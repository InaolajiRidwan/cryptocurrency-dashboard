import React, { useState } from "react";

export default function NavBar({ searchInput, setSearchInput }) {
  const [toggleState, setToggleState] = useState(false);
  const handleToggle = () => {
    setToggleState((prev) => !prev);

    document.body.classList.toggle("body-bg");
  };

  return (
    <div className="flex flex-col md:flex-row justify-between items-center shadow-md p-4 md:p-5 bg-white">
      <h1 className="text-base md:text-xl font-semibold text-black cursor-pointer mb-3 md:mb-0">
        Crypto
        <span className="text-red-600 font-extrabold">AirNova</span>
      </h1>

      <div className="flex w-full md:w-auto space-x-3 items-center">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search for crypto"
          className="flex-grow md:flex-grow-0 border border-gray-300 rounded-sm h-10 px-3 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
        <button
          onClick={handleToggle}
          style={{ color: toggleState ? "green" : "red", cursor: "pointer" }}
          aria-label="Toggle theme"
          className="text-2xl"
        >
          {toggleState ? "☀️" : "🌙"}
        </button>
      </div>
    </div>
  );
}
