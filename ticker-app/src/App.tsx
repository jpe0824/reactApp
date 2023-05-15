import { useState } from "react";
import "./App.scss";
import Table from "./components/Table";
import Title from "./components/Title";
import { StockItem } from "./types/types";

function App() {
  const storedData = localStorage.getItem("stockData");
  const [data, setData] = useState<StockItem[]>(
    storedData ? JSON.parse(storedData) : []
  );

  const handleAddTicker = async (item: StockItem) => {
    const newData = [...data, item];
    setData(newData);
    localStorage.setItem("stockData", JSON.stringify(newData));
  };

  return (
    <div>
      <Title data={data} onAddTicker={handleAddTicker} />
      <Table data={data} />
    </div>
  );
}

export default App;
