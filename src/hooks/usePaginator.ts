import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

export default function usePaginator<T>(array: T[], peerPage: number) {
  const getPagesCount = useCallback(() => {
    if (peerPage > array.length || peerPage <= 0) {
      return 1;
    }

    return Math.ceil(array.length / peerPage);
  }, [peerPage, array.length]);

  const [currentPage, setCurrentPage] = useState(1);
  const [start, setStart] = useState(0);
  const [end, setEnd] = useState(peerPage);

  const data = useMemo(() => (
    array.slice(start, end)
  ), [end, array, start]);

  const totalPages = useMemo(() => getPagesCount(), [getPagesCount]);

  const callback = useCallback((page: number) => {
    setCurrentPage(page);
    setStart(peerPage * (page - 1));
    setEnd(peerPage * page);
  }, [peerPage]);

  useEffect(() => {
  }, [data, end, start]);

  return {
    currentPage,
    totalPages,
    data,
    callback,
  };
}
