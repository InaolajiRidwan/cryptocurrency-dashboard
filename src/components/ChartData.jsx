import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

export function ChartData({ symbol }) {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!symbol) return;

    const API = import.meta.env.VITE_API_KEY;
    
    const url = `https://api.twelvedata.com/time_series?symbol=${symbol.toUpperCase()}&interval=1min&apikey=071c17c668e14576a095a4ce0a39459f`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log("Full API response:", data);

        if (!data.values || data.status === "error") {
          console.error("No time series data available or API error.");
          setLoading(false);
          return;
        }

        const timeSeries = data.values.slice(0, 10).reverse(); // latest 10 data points
        const dates = timeSeries.map((point) => point.datetime.slice(11, 16)); // HH:mm
        const prices = timeSeries.map((point) => parseFloat(point.close));

        setChartData({
          labels: dates,
          datasets: [
            {
              label: `${symbol.toUpperCase()} Closing Price`,
              data: prices,
              borderColor: "red",
              backgroundColor: "blue",
              fill: false,
              tension: 0.4,
            },
          ],
        });

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching from Twelve Data:", err);
        setLoading(false);
      });
  }, [symbol]);



 

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
    scales: {
      y: {
        beginAtZero: false,
      },
    },
  };

  return (
    
    <div className="p-4 md:p-6 shadow-lg rounded-lg my-4 max-w-xl mx-auto">
    <h2 className="text-xl md:text-2xl text-center uppercase font-extrabold mb-4 underline">
      Selected Coin Price
    </h2>
    {loading ? (
      <p className="text-base md:text-lg animate-pulse text-blue-600 font-semibold">
        👈🏼 click the IMAGE to Load chart...
      </p>
    ) : chartData?.labels?.length > 0 ? (
      <Line data={chartData} options={options} />
    ) : (
      <p className="text-center text-gray-600">No data available for this symbol.</p>
    )}
  </div>
  
  );
}
