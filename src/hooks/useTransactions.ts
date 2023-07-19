import { useEffect, useState } from 'react';

import type { Product } from '@modyo-dynamic/modyo-service-retail';
import { TransactionRepository } from '@modyo-dynamic/modyo-service-retail';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setTransactions } from '../store/slice';
import { getFilteredTransactions, getTransactions } from '../store/selectors';
import errorHandler from '../utils/errorHandler';

export default function useTransactions(productId: Product['id'], productQueryType: Product['queryType']) {
  const [loading, setLoading] = useState(false);
  const transactions = useAppSelector(getTransactions);
  const filteredTransactions = useAppSelector(getFilteredTransactions);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const {
      perform,
      abort,
    } = TransactionRepository.list(productId, productQueryType);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      setLoading(true);
      try {
        const data = await perform();
        dispatch(setTransactions(data));
        setLoading(false);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        errorHandler(error);
      }
    })();
    return () => {
      abort();
    };
  }, [dispatch, productId, productQueryType]);

  return {
    loading,
    transactions,
    filteredTransactions,
  };
}
