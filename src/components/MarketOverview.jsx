export function MarketOverview({ filteredCrypto }) {
  return (
    <div className="b rounded-lg p-4 mb-6 mx-4 mt-10">
      <h2 className="text-3xl uppercase p-3 mb-2 text-center font-extrabold underline ">
        Market Overview
      </h2>

      {/* Responsive wrapper for Mobile */}
      <div className="overflow-x-auto w-full hidden md:block items-center">
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
      </div>

      {/* {mobile responsive} */}
      <div className="block md:hidden">
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
      </div>
    </div>
  );
}
