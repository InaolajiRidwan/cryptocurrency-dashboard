export function MarketOverview({ filteredCrypto }) {
  return (
    <div className="b rounded-lg p-4 mb-6 mx-4 mt-10">
      <h2 className="text-3xl uppercase p-3 mb-2 text-center font-extrabold underline ">
        Market Overview
      </h2>

      {/* Responsive wrapper for Mobile */}
      {/* <div className="overflow-x-auto w-full hidden md:block items-center">
        <table className="min-w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-4 py-2 text-left">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                24h Change
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Market Cap
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Volume (K)
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredCrypto.map((c) => (
              <tr key={c.id} className="hover:bg-gray-50 text-sm md:text-xl">
                <td className="border border-gray-300 px-4 md:text-xl text-sm py-2">
                  {c.name}
                </td>
                <td
                  className={`border border-gray-300 px-4 py-2 flex items-center text-sm ${
                    c.price_change_percentage_24h < 0
                      ? "text-red-500"
                      : "text-green-500"
                  }`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-1"
                    style={{
                      transform:
                        c.price_change_percentage_24h < 0
                          ? "rotate(180deg)"
                          : "none",
                    }}
                  >
                    <path d="m5 12 7-7 7 7"></path>
                    <path d="M12 19V5"></path>
                  </svg>
                  <p className="text-sm md:text-xl">
                    {" "}
                    {c.price_change_percentage_24h.toFixed(2)}%
                  </p>
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  ${c.market_cap.toLocaleString()}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {(c.total_volume / 1000).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> */}

      {/* {mobile responsive} */}
      {/* <div className="block md:hidden">
        {filteredCrypto.map((crypto, index) => (
          <div key={crypto.id} className="bg-white p-4 rounded shadow">
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
      </div> */}





      {/* Desktop Table */}
<div className="hidden md:block w-full overflow-x-auto">
  <table className="min-w-full border border-gray-200 rounded-lg shadow-md bg-white">
    <thead>
      <tr className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wide">
        <th scope="col" className="px-6 py-3 text-left border-b">Name</th>
        <th scope="col" className="px-6 py-3 text-left border-b">24h Change</th>
        <th scope="col" className="px-6 py-3 text-left border-b">Market Cap</th>
        <th scope="col" className="px-6 py-3 text-left border-b">Volume (K)</th>
      </tr>
    </thead>
    <tbody>
      {filteredCrypto.map((c) => (
        <tr
          key={c.id}
          className="hover:bg-gray-100 transition-all border-b last:border-none text-sm"
        >
          <td className="px-6 py-4 font-medium text-gray-900">{c.name}</td>
          <td
            className={`px-6 py-4 flex items-center ${
              c.price_change_percentage_24h < 0
                ? "text-red-500"
                : "text-green-500"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-1"
              style={{
                transform:
                  c.price_change_percentage_24h < 0 ? "rotate(180deg)" : "none",
              }}
            >
              <path d="m5 12 7-7 7 7"></path>
              <path d="M12 19V5"></path>
            </svg>
            {c.price_change_percentage_24h.toFixed(2)}%
          </td>
          <td className="px-6 py-4 text-gray-700">
            ${c.market_cap.toLocaleString()}
          </td>
          <td className="px-6 py-4 text-gray-700">
            {(c.total_volume / 1000).toFixed(2)}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

{/* Mobile Card Layout */}
<div className="block md:hidden space-y-4">
  {filteredCrypto.map((crypto, index) => (
    <div
      key={crypto.id}
      className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm"
    >
      <div className="text-gray-500 text-xs mb-1">#{index + 1}</div>
      <p className="text-base font-semibold text-gray-800">{crypto.name}</p>
      <p className="text-sm">
        <span className="text-gray-600 font-medium">Symbol:</span>{" "}
        {crypto.symbol?.toUpperCase()}
      </p>
      <p className="text-sm">
        <span className="text-gray-600 font-medium">Price:</span> $
        {crypto.current_price?.toLocaleString() || "N/A"}
      </p>
      <p className="text-sm">
        <span className="text-gray-600 font-medium">24h Change:</span>{" "}
        <span
          className={`font-semibold ${
            crypto.price_change_percentage_24h < 0
              ? "text-red-500"
              : "text-green-500"
          }`}
        >
          {crypto.price_change_percentage_24h.toFixed(2)}%
        </span>
      </p>
      <p className="text-sm">
        <span className="text-gray-600 font-medium">Market Cap:</span> $
        {crypto.market_cap.toLocaleString()}
      </p>
      <p className="text-sm">
        <span className="text-gray-600 font-medium">Volume (K):</span>{" "}
        {(crypto.total_volume / 1000).toFixed(2)}
      </p>
    </div>
  ))}
</div>

    </div>
  );
}
