import { StockItem } from "../types/types";

interface TableProps {
  data: StockItem[];
}

function Table({ data }: TableProps) {
  if (data.length < 1) return null;

  return (
    <>
      <div className="table-container mx-auto">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Symbol</th>
              <th scope="col">Last Price</th>
              <th scope="col">Change</th>
              <th scope="col">Change %</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.symbol}>
                <td>
                  <i
                    className={
                      item.change.startsWith("-")
                        ? "bi bi-caret-down-fill text-danger"
                        : "bi bi-caret-up-fill text-success"
                    }
                  ></i>
                  {item.symbol}
                </td>
                <td>{item.lastPrice}</td>
                <td>{item.change}</td>
                <td>{item.changePercent}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Table;
