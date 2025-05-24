import NavBar from "./components/NavBar";
import Main from "./components/Main";
import Aside from "./components/Aside";
import { useState,useEffect } from "react";
import "./App.css"

function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [error, setError] = useState("");
  const [searchInput, setSearchInput] = useState("")

  useEffect(() => {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCryptoData(data);
      })
      .catch(() => setError("Error fetching crypto data."));
  }, []);

  const filteredCrypto = cryptoData.filter((c) =>
    c.name.toLowerCase().includes(searchInput.toLowerCase())
  );

  
  return (
    <div className="h-screen overflow-hidden">
      <div className="fixed bg-gray-100 top-0 h-18  w-full z-1 ">
        <NavBar searchInput={searchInput} setSearchInput={setSearchInput} />
       
      </div>

      <aside className="fixed sm:hidden top-16 left-0 w-64 h-[calc(100%-4rem)] shadow-md hidden md:block z-40">
        <Aside />
      </aside>

      <main className="pt-16 md:ml-64 h-[calc(100%-4rem)] mt-5 overflow-y-auto ">
        <Main filteredCrypto={filteredCrypto} cryptoData={cryptoData} setCryptoData={setCryptoData} error={error}  setError={setError} />
      </main>
    </div>
  );
}

export default App;
