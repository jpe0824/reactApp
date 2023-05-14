import { FormEvent, useState } from "react";
import { StockItem } from "../types/types";
// import YahooFinanceAPI from 'yahoo-finance2';

interface TitleProps {
  data: StockItem[];
  onAddTicker: (item: StockItem) => void;
}

function Title({ data, onAddTicker }: TitleProps) {
  const isTableEmpty = data.length !== 0;
  const titleClassName = `text-center d-flex flex-column align-items-center mb-4 ${
    isTableEmpty ? "title-style" : "title-style-empty"
  }`;

  const [showForm, setShowForm] = useState(false); // define showForm here

  const handleAddTicker = () => {
    setShowForm(true);
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const symbolInput = event.currentTarget.elements.namedItem(
      "symbol"
    ) as HTMLInputElement;
    const symbol = symbolInput.value;

    // get data from yahoo-finance api
    // const response = await YahooFinanceAPI.search(symbol);
    // const {
    //   symbol: tickerSymbol,
    //   shortName,
    //   regularMarketPrice,
    //   regularMarketChange,
    // } = response.quoteSummary.result[0].price;

    // // create new item with data from yahoo-finance api
    // const newItem = {
    //   symbol: tickerSymbol,
    //   name: shortName,
    //   lastPrice: regularMarketPrice.fmt,
    //   change: regularMarketChange.fmt,
    // };

    // onAddTicker(newItem); // pass newItem to onAddTicker function
    setShowForm(false); // hide form
  };

  return (
    <>
      <div className={titleClassName}>
        <h1 className="mb-4">TCKR Stats</h1>
        {!showForm && (
          <button className="btn btn-outline-primary" onClick={handleAddTicker}>
            <i className="bi bi-plus-lg"></i>
          </button>
        )}
        {showForm && (
          <form onSubmit={handleFormSubmit}>
            <div className="input-group mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Ticker symbol"
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
          </form>
        )}
      </div>
    </>
  );
}

export default Title;
