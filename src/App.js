import { useState, useRef, useCallback } from "react";
import useBookSearch from "./useBookSearch";

function App() {
  const [query, setQuery] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const { book, hasMore, loading, error } = useBookSearch(query, pageNumber);
  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  function handleSearch(e) {
    setQuery(e.target.value);
    setPageNumber(1);
  }

  return (
    <>
      <input type="text" value={query} onChange={handleSearch} />
      {book.map((b, index) => {
        if (book.length === index + 1) {
          return (
            <div ref={lastBookElementRef} key={b}>
              {b}
            </div>
          );
        } else {
          return <div key={b}>{b}</div>;
        }
      })}
      <div> {loading && "Loading ..."} </div>
      <div> {error && "Error..."} </div>
    </>
  );
}

export default App;
