import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getQueryFilter, getSelectedPage } from '../../store/selectors';
import { setMetadata } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import type { Account, Dispute } from '../interface';
import { DisputeRepository } from '../repositories';
import ApiError from '../utils/ApiError';

export default function useDisputesEffect(account: Account) {
  const [loading, setLoading] = useState(false);
  const [disputes, setDisputes] = useState<Dispute[]>([]);
  const query = useAppSelector(getQueryFilter);
  const selectedPage = useAppSelector(getSelectedPage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      setLoading(true);
      try {
        const { data, metadata } = await DisputeRepository.list(
          {
            account,
            query,
            page: selectedPage,
            config: {
              abortSignal: abortController.signal,
            },
          },
        );

        setDisputes(data);
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
  }, [account, dispatch, selectedPage, query]);

  return {
    loading,
    disputes,
  };
}
