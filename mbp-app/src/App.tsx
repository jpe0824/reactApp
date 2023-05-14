import ListGroup from "./components/ListGroup";

function App() {
  let items = ["new york", "san fran", "paris", "london", "tokyo"];

  return (
    <div>
      <ListGroup items={items} heading="Cities"/>
    </div>
  );
}

export default App;
