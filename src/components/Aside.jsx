import React from "react";

export default function Aside() {
  return (
    <div className="h-[100%] mt-4">
      <div>
        <ul className="flex flex-col gap-8 p-10  text-xl ">
          <li className="cursor-pointer hover:shadow-lg p-2">⌨ DashBoard</li>
          <li className="cursor-pointer  hover:shadow-lg ">📈 MarketOverview</li>
          <li className="cursor-pointer  hover:shadow-lg p-2">⏱️ Watchlist</li>
          <li className="cursor-pointer  hover:shadow-lg p-2">⚙️ Settings</li>
        </ul>
      </div>
    </div>
  );
}
