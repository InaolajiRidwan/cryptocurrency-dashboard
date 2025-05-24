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
   
  <div className="custom-theme flame p-6 md:p-10 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6 items-start mt-2 md:mt-5 lg:mt-2">
  {/* Error or Loading States */}
  {error && <p className="text-red-500 col-span-full">{error}</p>}
  {filteredCrypto.length === 0 && !error && (
    <p className="col-span-full text-center text-gray-600">Loading...</p>
  )}

  {/* Crypto Cards Section */}
  <div className="grid grid-cols-1 md:grid-cols-1  lg:grid-cols-2  xl:grid-cols-3 gap-4 ">
    {filteredCrypto.map((crypto) => (
      <div
        key={crypto.id}
        className="flex justify-between p-4  shadow-md rounded-lg bg-white w-full max-w-xl mx-auto border border-gray-200"
      >
        {/* Left */}
        <div className="flex flex-col justify-between">
          <h2 className="text-gray-600 text-sm italic">{crypto.name}</h2>
          <p className="font-bold text-sm text-blue-700">${crypto.high_24h.toLocaleString()}</p>
          <div
            className={`flex items-center space-x-1 ${
              crypto.price_change_percentage_24h < 0 ? "text-red-500" : "text-green-500"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform"
              style={{
                transform: crypto.price_change_percentage_24h < 0 ? "rotate(180deg)" : "none",
              }}
            >
              <path d="m5 12 7-7 7 7"></path>
              <path d="M12 19V5"></path>
            </svg>
            <span className="text-sm">{crypto.price_change_percentage_24h.toFixed(2)}%</span>
          </div>
          <img
            className="cursor-pointer pt-4 hover:scale-110 transition-transform"
            src={crypto.image}
            alt={crypto.name}
            width={24}
            height={24}
            onClick={() => setRenderChart(`${crypto.symbol.toUpperCase()}/USD`)}
          />
        </div>

        {/* Right */}
        <div className="flex flex-col justify-between items-end ">
          <p className="text-right text-xs text-gray-500 uppercase">{crypto.symbol}</p>
          <button
            className="bg-blue-500 text-white rounded p-1 py-1 text-xs mt-2 hover:bg-blue-600 transition"
            onClick={() => handleWatchList(crypto)}
          >
            Watchlist
          </button>
        </div>
      </div>
    ))}
  </div>

  {/* Chart + Watchlist Section */}
  <div className="w-full space-y-6">
    {/* Chart */}
    <ChartData
      symbol={renderChart}
      setRenderChart={setRenderChart}
      cryptoData={cryptoData}
      filteredCrypto={filteredCrypto}
    />

    {/* Desktop Watchlist */}
    <div className="hidden sm:block">
      <h1 className="text-center font-extrabold text-2xl p-4 underline ">
        Watchlist
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300 text-sm">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-4 py-2 border-b">#</th>
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Symbol</th>
              <th className="px-4 py-2 border-b">Price</th>
            </tr>
          </thead>
          <tbody>
            {watchList.map((crypto, index) => (
              <tr key={crypto.id} className="hover:bg-gray-100">
                <td className="px-4 py-2 border-b">{index + 1}</td>
                <td className="px-4 py-2 border-b">{crypto.name}</td>
                <td className="px-4 py-2 border-b">{crypto.symbol?.toUpperCase()}</td>
                <td className="px-4 py-2 border-b">
                  ${crypto.current_price?.toLocaleString() || "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Mobile Watchlist */}
    <div className="sm:hidden space-y-4">
      <h1 className="text-lg font-bold text-center">Watchlist</h1>
      {watchList.map((crypto, index) => (
        <div
          key={crypto.id}
          className="bg-white p-4 rounded shadow-sm border border-gray-200 max-w-sm mx-auto"
        >
          <p className="text-xs text-gray-500 mb-1">#{index + 1}</p>
          <p className="text-sm font-semibold">Name: {crypto.name}</p>
          <p className="text-sm">Symbol: {crypto.symbol?.toUpperCase()}</p>
          <p className="text-sm">Price: ${crypto.current_price?.toLocaleString() || "N/A"}</p>
        </div>
      ))}
    </div>

    {/* Market Overview Section */}
    <div className="pt-6">
      <MarketOverview filteredCrypto={filteredCrypto} />
    </div>
  </div>
</div>



  );
}


