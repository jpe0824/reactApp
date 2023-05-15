import { FormEvent, useState } from "react";
import { StockItem } from "../types/types";

interface TitleProps {
  data: StockItem[];
  onAddTicker: (item: StockItem) => void;
}

async function fetchStock(stockSymbol: string) {
  const API_KEY = "WOTRJ5ZI9UOUZ4X7";
  let API_Call = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&outputsize=compact&apikey=${API_KEY}`;
  let data = fetch(API_Call)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return data;
    });

  return data;
}

function Title({ data, onAddTicker }: TitleProps) {
  const isTableEmpty = data.length !== 0;
  const titleClassName = `text-center d-flex flex-column align-items-center mb-4 ${
    isTableEmpty ? "full" : "empty"
  }`;

  const [showForm, setShowForm] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const handleAddTicker = () => {
    setShowForm(true);
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    const symbolInput = event.currentTarget.elements.namedItem(
      "symbol"
    ) as HTMLInputElement;
    const symbol = symbolInput.value.toUpperCase();

    if (data.some((item) => item.symbol === symbol)) {
      setErrorMessage(`${symbol} already exists.`);
      return;
    }

    const stockData = await fetchStock(symbol);

    if (stockData["Global Quote"] === undefined) {
      setErrorMessage(`Symbol is required`);
      return;
    }

    const lastPrice = parseFloat(
      stockData["Global Quote"]["05. price"]
    ).toFixed(2);

    if (isNaN(lastPrice as any)) {
      setErrorMessage(`Could not find ${symbol}`);
      return;
    }

    const change = parseFloat(stockData["Global Quote"]["09. change"]).toFixed(
      2
    );
    const changePercent = parseFloat(
      stockData["Global Quote"]["10. change percent"]
    ).toFixed(2);
    const item: StockItem = { symbol, lastPrice, change, changePercent };
    onAddTicker(item);

    setShowForm(false);
  };

  return (
    <>
      <div className={titleClassName}>
        <h1 className="mb-4 title-style">TCKR Stats</h1>
        {!showForm && (
          <button className="btn btn-outline-primary" onClick={handleAddTicker}>
            <i className="bi bi-plus-lg"></i>
          </button>
        )}
        {showForm && (
          <form needs-validation onSubmit={handleFormSubmit} noValidate>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Stock symbol i.e. AAPL"
                aria-label="Ticker symbol"
                aria-describedby="add-ticker-button"
                name="symbol"
              />
              <button
                className="btn btn-primary"
                type="submit"
                id="add-ticker-button"
              >
                Add
              </button>
            </div>
            {errorMessage && (
              <div className="text-sm alert alert-danger">
                <i className="bi bi-exclamation-triangle">
                  <em> {errorMessage}</em>
                </i>
              </div>
            )}
          </form>
        )}
      </div>
    </>
  );
}

export default Title;
