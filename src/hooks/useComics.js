import { useState, useEffect, useCallback, useRef } from 'react';
import { fetchComics } from '../services/marvelApi';

export function useComics({
  limit = 20,
  titleStartsWith = '',
  characterId = null,
  orderBy = '-onsaleDate',
  format = 'comic',
  autoFetch = true
} = {}) {
  const [comics, setComics] = useState([]);
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const [isLiveApi, setIsLiveApi] = useState(false);
  const [attribution, setAttribution] = useState('');

  const abortControllerRef = useRef(null);

  const loadData = useCallback(async (isNextPage = false) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    const controller = new AbortController();
    abortControllerRef.current = controller;

    const currentOffset = isNextPage ? offset + limit : 0;

    if (isNextPage) {
      setLoadingMore(true);
    } else {
      setLoading(true);
    }
    setError(null);

    try {
      const response = await fetchComics({
        limit,
        offset: currentOffset,
        titleStartsWith,
        characterId,
        orderBy,
        format,
        signal: controller.signal
      });

      if (isNextPage) {
        setComics(prev => [...prev, ...response.comics]);
      } else {
        setComics(response.comics);
      }

      setTotal(response.total);
      setOffset(currentOffset);
      setIsLiveApi(response.isLiveApi);
      setAttribution(response.attribution);
      if (response.apiError) {
        setError(response.apiError);
      }
    } catch (err) {
      if (err.name !== 'AbortError') {
        setError(err.message || 'Failed to fetch comic data');
      }
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, [limit, offset, titleStartsWith, characterId, orderBy, format]);

  useEffect(() => {
    if (autoFetch) {
      setOffset(0);
      loadData(false);
    }

    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [titleStartsWith, characterId, orderBy, format, autoFetch]);

  const loadMore = useCallback(() => {
    if (!loading && !loadingMore && comics.length < total) {
      loadData(true);
    }
  }, [loading, loadingMore, comics.length, total, loadData]);

  const refetch = useCallback(() => {
    setOffset(0);
    loadData(false);
  }, [loadData]);

  return {
    comics,
    total,
    loading,
    loadingMore,
    error,
    isLiveApi,
    attribution,
    hasMore: comics.length < total,
    loadMore,
    refetch
  };
}
