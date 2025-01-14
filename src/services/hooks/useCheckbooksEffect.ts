import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getQueryFilterCheckbook, getSelectedPage } from '../../store/selectors';
import { setMetadata } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import { Checkbook } from '../interface';
import { CheckbookRepository } from '../repositories';
import ApiError from '../utils/ApiError';

export default function useCheckbooksEffect() {
  const [loading, setLoading] = useState(false);
  const [dataCheckbooks, setDataCheckbooks] = useState<Checkbook[] | null>(null);
  const query = useAppSelector(getQueryFilterCheckbook);
  const selectedPage = useAppSelector(getSelectedPage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      setLoading(true);
      try {
        const { data, metadata } = await CheckbookRepository.list({
          page: selectedPage,
          query,
        });
        setDataCheckbooks(data);
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
    data: dataCheckbooks,
  };
}
