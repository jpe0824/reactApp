import { StockItem } from "../types/types";

interface TableProps {
  data: StockItem[];
}

function Table({ data }: TableProps) {
  if (data.length < 1) return null;

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Symbol</th>
            <th scope="col">Name</th>
            <th scope="col">Last Price</th>
            <th scope="col">Change</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.symbol}>
              <td>{item.symbol}</td>
              <td>{item.name}</td>
              <td>{item.lastPrice}</td>
              <td>{item.change}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default Table;
