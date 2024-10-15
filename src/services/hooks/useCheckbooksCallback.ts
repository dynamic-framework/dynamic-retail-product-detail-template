import { useEffect, useState } from 'react';

import { useAppSelector } from '../../store/hooks';
import { getQueryFilterCheckbook } from '../../store/selectors';
import errorHandler from '../../utils/errorHandler';
import { Checkbook } from '../interface';
import { CheckbookRepository } from '../repositories';
import ApiError from '../utils/ApiError';

export default function useCheckbooksCallback() {
  const [loading, setLoading] = useState(false);
  const [dataCheckbooks, setDataCheckbooks] = useState<Checkbook[] | null>(null);
  const query = useAppSelector(getQueryFilterCheckbook);

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      setLoading(true);
      try {
        const { content } = await CheckbookRepository.list(query);
        setDataCheckbooks(content);
        setLoading(false);
      } catch (error) {
        if ((error as ApiError).name === 'CanceledError') return;

        errorHandler(error);
      }
    })();
    return () => {
      abortController.abort();
    };
  }, [query]);

  return {
    loading,
    data: dataCheckbooks,
  };
}
