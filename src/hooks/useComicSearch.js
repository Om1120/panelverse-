import { useState, useEffect, useRef } from 'react';
import { fetchComics } from '../services/marvelApi';

export function useComicSearch(debounceMs = 350) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isLiveApi, setIsLiveApi] = useState(false);

  const abortControllerRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (abortControllerRef.current) abortControllerRef.current.abort();

    const trimmed = query.trim();
    if (!trimmed) {
      setResults([]);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    timerRef.current = setTimeout(async () => {
      const controller = new AbortController();
      abortControllerRef.current = controller;

      try {
        const response = await fetchComics({
          limit: 12,
          offset: 0,
          titleStartsWith: trimmed,
          orderBy: 'title',
          signal: controller.signal
        });

        setResults(response.comics);
        setIsLiveApi(response.isLiveApi);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Search failed');
        }
      } finally {
        setLoading(false);
      }
    }, debounceMs);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (abortControllerRef.current) abortControllerRef.current.abort();
    };
  }, [query, debounceMs]);

  const clearSearch = () => {
    setQuery('');
    setResults([]);
  };

  return {
    query,
    setQuery,
    results,
    loading,
    error,
    isLiveApi,
    clearSearch
  };
}
