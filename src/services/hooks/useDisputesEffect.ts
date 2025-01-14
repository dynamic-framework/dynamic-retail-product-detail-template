import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getDisputes, getSelectedPage } from '../../store/selectors';
import { setDisputes, setMetadata } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import type { Account } from '../interface';
import { DisputeRepository } from '../repositories';
import ApiError from '../utils/ApiError';

export default function useDisputesEffect(account: Account) {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const disputes = useAppSelector(getDisputes);
  const selectedPage = useAppSelector(getSelectedPage);

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      setLoading(true);
      try {
        const { data, metadata } = await DisputeRepository.list(
          {
            account,
            page: selectedPage,
            config: {
              abortSignal: abortController.signal,
            },
          },
        );
        dispatch(setDisputes(data));
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
  }, [account, dispatch, selectedPage]);

  return {
    loading,
    disputes,
  };
}
