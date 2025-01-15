import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getQueryFilter, getSelectedPage } from '../../store/selectors';
import { setMetadata } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import { Checkbook } from '../interface';
import { CheckbookRepository } from '../repositories';
import ApiError from '../utils/ApiError';

export default function useCheckbooksEffect() {
  const [loading, setLoading] = useState(false);
  const [checkbooks, setCheckbooks] = useState<Checkbook[]>([]);
  const query = useAppSelector(getQueryFilter);
  const selectedPage = useAppSelector(getSelectedPage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      setLoading(true);
      try {
        const { data, metadata } = await CheckbookRepository.list(
          {
            page: selectedPage,
            query,
            config: {
              abortSignal: abortController.signal,
            },
          },
        );

        setCheckbooks(data);
        dispatch(setMetadata(metadata));
        setLoading(false);
      } catch (error) {
        if ((error as ApiError).name === 'CanceledError') return;

        errorHandler(error);
      }
    })();
    return () => {
      abortController.abort();
    };
  }, [dispatch, query, selectedPage]);

  return {
    loading,
    checkbooks,
  };
}
