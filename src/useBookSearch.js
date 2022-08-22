import { useEffect, useState } from "react";
import axios from "axios";

export default function useBookSearch(query, pageNumber) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [book, setBook] = useState([]);
  const [hasMore, setHasMore] = useState(false);

  useEffect(() => {
    setBook([]);
  }, [query]);

  useEffect(() => {
    setLoading(true);
    setError(false);
    let cancel;
    axios({
      method: "GET",
      url: "http://openlibrary.org/search.json",
      cancelToken: new axios.CancelToken((c) => (cancel = c)),
      params: { q: query, page: pageNumber },
    })
      .then((res) => {
        setBook((prevBook) => {
          return [
            ...new Set([...prevBook, ...res.data.docs.map((b) => b.title)]),
          ];
        });
        setHasMore(res.data.docs.length > 0);
        setLoading(false);
        console.log(res.data);
      })

      .catch((e) => {
        if (axios.isCancel(e)) return;
        setError(true);
      });
    return () => cancel();
  }, [query, pageNumber]);
  return { book, error, hasMore, loading };
}
