import { useEffect, useState } from 'react';

import type { Product } from '@modyo-dynamic/modyo-service-retail';
import { TransactionRepository } from '@modyo-dynamic/modyo-service-retail';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setTransactionsScheduled } from '../store/slice';
import { getTransactionsScheduled } from '../store/selectors';
import errorHandler from '../utils/errorHandler';

export default function useTransactionsScheduled(productId: Product['id']) {
  const [loading, setLoading] = useState(false);
  const transactions = useAppSelector(getTransactionsScheduled);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const {
      perform,
      abort,
    } = TransactionRepository.list(productId, 'scheduled');
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      setLoading(true);
      try {
        const data = await perform();
        dispatch(setTransactionsScheduled(data));
        setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        errorHandler(error);
      }
    })();
    return () => {
      abort();
    };
  }, [dispatch, productId]);

  return {
    loading,
    transactions,
  };
}
