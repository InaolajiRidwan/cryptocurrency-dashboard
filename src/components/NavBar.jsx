import React, { useState } from "react";

export default function NavBar({ searchInput, setSearchInput }) {
  const [toggleState, setToggleState] = useState(false);
  const handleToggle = () => {
    setToggleState((prev) => !prev);

    // Toggle multiple body classes
    document.body.classList.toggle("body-bg");
  };

  return (
    <div className="flex justify-between shadow-md  p-5 px-10">
      <div>
        <h1 className="md:text-2xl text-sm text-black  cursor-pointer">
          Crypto<span className="text-red-600 font-extrabold">AirNova</span>
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-4 items-center ">
        <input
          className="border-3 rounded-sm h-8 p-3"
          type="text"
          value={searchInput}
          placeholder="search for crypto"
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <div>
          <button
            style={{ color: toggleState ? "green" : "red", cursor: "pointer" }}
            onClick={handleToggle}
          >{`${toggleState ? "☀️" : "🌙"}`}</button>
        </div>
      </div>
    </div>
  );
}
