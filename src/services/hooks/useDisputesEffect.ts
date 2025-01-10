import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getDisputes } from '../../store/selectors';
import { setDisputes } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import type { Account } from '../interface';
import { DisputeRepository } from '../repositories';
import ApiError from '../utils/ApiError';

export default function useDisputesEffect(account: Account) {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const disputes = useAppSelector(getDisputes);

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      setLoading(true);
      try {
        const data = await DisputeRepository.list(
          {
            account,
            config: {
              abortSignal: abortController.signal,
            },
          },
        );
        dispatch(setDisputes(data));
        setLoading(false);
      } catch (error) {
        if ((error as ApiError).name === 'CanceledError') return;

        errorHandler(error);
      }
    })();
    return () => {
      abortController.abort();
    };
  }, [account, dispatch]);

  return {
    loading,
    disputes,
  };
}
