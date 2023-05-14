import "./App.css";
import Table from "./components/Table";
import Title from "./components/Title";
import { StockItem } from "./types/types";

function App() {
  const data: StockItem[] = [
    { symbol: "AAPL", name: "Apple Inc.", lastPrice: 125.9, change: -0.24 },
    { symbol: "GOOG", name: "Alphabet Inc.", lastPrice: 2315.3, change: 2.57 },
    {
      symbol: "MSFT",
      name: "Microsoft Corporation",
      lastPrice: 249.73,
      change: 1.45,
    },
    { symbol: "TSLA", name: "Tesla Inc.", lastPrice: 601.51, change: -1.63 },
  ];

  const handleAddTicker = () => {
    console.log("Add ticker clicked");
  };

  return (
    <div>
      <Title data={data} onAddTicker={handleAddTicker} />
      <Table data={data} />
    </div>
  );
}

export default App;
