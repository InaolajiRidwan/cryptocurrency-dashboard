import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";

export function ChartData({ symbol }) {
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!symbol) return;

    const API = import.meta.env.VITE_API_KEY;
    const url = `https://api.twelvedata.com/time_series?symbol=${symbol.toUpperCase()}&interval=1min&apikey=${API}`;

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
    <div className="p-4 shadow-lg rounded-lg my-4">
      <h2 className="text-2xl text-center p-3 uppercase font-extrabold mb-4 underline">
        Selected Coin Price
      </h2>
      {loading ? (
        <p className="text-lg animate-pulse text-blue-600 font-semibold">
          👈🏼 click the IMAGE to Load chart...
        </p>
      ) : chartData?.labels?.length > 0 ? (
        <Line data={chartData} options={options} />
      ) : (
        <p>No data available for this symbol.</p>
      )}
    </div>
  );
}
