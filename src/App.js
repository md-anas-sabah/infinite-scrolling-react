import { useState } from "react";
import useBookSearch from "./useBookSearch";

function App() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);

  function handleSearch(e) {
    setQuery(e.target.value);
    setPageNumber(1);
  }

  const { book, hasMore, loading, error } = useBookSearch(query, pageNumber);
  return (
    <>
      <input type="text" value={query} onChange={handleSearch} />
      {book.map((b) => {
        return <div key={b}>{b}</div>;
      })}
      <div> {loading && "Loading ..."} </div>
      <div> {error && "Error..."} </div>
    </>
  );
}

export default App;
