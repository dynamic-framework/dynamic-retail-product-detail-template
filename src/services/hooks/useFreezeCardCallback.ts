import { useCallback, useState } from 'react';

import { useAppDispatch } from '../../store/hooks';
import { setAccountsFreezed } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import { AccountRepository } from '../repositories';

export default function useFreezeCardCallback() {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const freezeCard = useCallback(async (
    accountId: string,
    freeze: boolean,
  ) => {
    const abortController = new AbortController();
    try {
      setLoading(true);
      await AccountRepository.freezeCard(
        {
          config: {
            abortSignal: abortController.signal,
          },
        },
      );

      dispatch(setAccountsFreezed({ [accountId]: freeze }));
      setLoading(false);
    } catch (error) {
      errorHandler(error);
      throw error;
    }
  }, [dispatch]);

  return {
    loading,
    freezeCard,
  };
}
