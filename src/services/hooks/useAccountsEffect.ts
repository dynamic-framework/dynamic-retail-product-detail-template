import { useEffect } from 'react';

import { API_ACCOUNT_LIST_FILTER } from '../../config/widgetConfig';
import { useAppDispatch } from '../../store/hooks';
import { setAccounts, setAccountsFreezed, setIsLoadingAccountList } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import { AccountType } from '../config';
import { AccountRepository } from '../repositories';

export default function useAccountsEffect() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      dispatch(setIsLoadingAccountList(true));

      try {
        const data = await AccountRepository.list(
          API_ACCOUNT_LIST_FILTER as AccountType,
          { abortSignal: abortController.signal },
        );
        dispatch(setAccounts(data));
        const dataFreezed = data.reduce<Record<string, boolean>>(
          (acc, e: { id: string, freeze: boolean }) => ({
            ...acc,
            [e.id]: e.freeze,
          }),
          {},
        );

        dispatch(setAccountsFreezed(dataFreezed));

        dispatch(setIsLoadingAccountList(false));
      } catch (error) {
        errorHandler(error);
      }
    })();

    return () => {
      abortController.abort();
    };
  }, [dispatch]);
}
