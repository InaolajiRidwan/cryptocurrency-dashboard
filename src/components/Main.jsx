import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useState } from "react";
import { MarketOverview } from "./MarketOverview";
import { ChartData } from "./ChartData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export default function Main({ filteredCrypto, cryptoData, error }) {
  const [renderChart, setRenderChart] = useState(filteredCrypto?.symbol || "");
  const [watchList, setWatchList] = useState([]);

  const handleWatchList = (crypto) => {
    setWatchList((prev) => {
      const filteredItem = prev.filter((item) => item.id === crypto.id);
      return filteredItem.length > 0 ? prev : [...prev, crypto];
    });
  };

  return (
    <div className="custom-theme flame p-10 grid md:grid-cols-2 gap-4 items-start grid-cols-1">
      {error && <p className="text-red-500">{error}</p>}
      {filteredCrypto.length === 0 && !error && <p>Loading...</p>}

      {/* Crypto Cards Section */}
      <div className="grid md:grid-cols-3 grid-cols-1 gap-10">
        {filteredCrypto.map((crypto) => (
          <div
            key={crypto.id}
            className="flex justify-between p-4 shadow-2xl rounded-md w-full max-w-sm bg-white mx-auto"
          >
            {/* Left Section */}
            <div className="flex flex-col justify-between">
              <h2 className="text-lg italic">{crypto.name}</h2>
              <p className="font-bold">${crypto.high_24h.toLocaleString()}</p>
              <div
                className={`flex items-center space-x-1 ${
                  crypto.price_change_percentage_24h < 5
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{
                    transform:
                      crypto.price_change_percentage_24h < 0
                        ? "rotate(180deg)"
                        : "none",
                  }}
                >
                  <path d="m5 12 7-7 7 7"></path>
                  <path d="M12 19V5"></path>
                </svg>
                <span>{crypto.price_change_percentage_24h.toFixed(2)}</span>
              </div>
              <img
                className="cursor-pointer pt-4"
                src={crypto.image}
                alt={crypto.name}
                width={24}
                height={24}
                onClick={() =>
                  setRenderChart(`${crypto.symbol.toUpperCase()}/USD`)
                }
              />
            </div>

            {/* Right Section */}
            <div className="flex flex-col justify-between items-end">
              <p className="text-right uppercase">{crypto.symbol}</p>
              <button
                className="bg-blue-500 text-white rounded-md p-2 text-sm cursor-pointer"
                onClick={() => handleWatchList(crypto)}
              >
                ✚ Watchlist
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Chart + Watchlist Section */}
      <div className="w-full">
        <ChartData
          symbol={renderChart}
          setRenderChart={setRenderChart}
          cryptoData={cryptoData}
          filteredCrypto={filteredCrypto}
        />

        {/* Desktop Table */}
        <div className="hidden sm:block overflow-x-auto w-full mt-8">
        <h1 className="text-center font-extrabold text-2xl p-4 underline">WATCHLIST</h1>
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">#</th>
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Symbol</th>
                <th className="px-4 py-2 border-b">Price</th>
              </tr>
            </thead>
            <tbody>
              {watchList.map((crypto, index) => (
                <tr key={crypto.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{index + 1}</td>
                  <td className="px-4 py-2 border-b">{crypto.name}</td>
                  <td className="px-4 py-2 border-b">
                    {crypto.symbol?.toUpperCase()}
                  </td>
                  <td className="px-4 py-2 border-b">
                    ${crypto.current_price?.toLocaleString() || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Watchlist Cards */}
        <div className="sm:hidden space-y-4 mt-8">
          <h1>WATCHLIST</h1>
          {watchList.map((crypto, index) => (
            <div
              key={crypto.id}
              className="bg-white p-4 rounded shadow w-full max-w-sm mx-auto"
            >
              <p>
                <strong>#{index + 1}</strong>
              </p>
              <p>
                <strong>Name:</strong> {crypto.name}
              </p>
              <p>
                <strong>Symbol:</strong> {crypto.symbol?.toUpperCase()}
              </p>
              <p>
                <strong>Price:</strong> $
                {crypto.current_price?.toLocaleString() || "N/A"}
              </p>
            </div>
          ))}
        </div>

        {/* Market Overview */}
        <div className="mt-8">
          <MarketOverview filteredCrypto={filteredCrypto} />
        </div>
      </div>
    </div>
  );
}
