import { useEffect } from 'react';

import { API_ACCOUNT_LIST_FILTER } from '../../config/widgetConfig';
import { useAppDispatch } from '../../store/hooks';
import {
  setAccounts, setAccountsFreezed, setIsLoadingAccountList,
} from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import { AccountType } from '../config';
import { AccountRepository } from '../repositories';
import ApiError from '../utils/ApiError';

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
          (accounts, account: { id: string, freeze: boolean }) => ({
            ...accounts,
            [account.id]: account.freeze,
          }),
          {},
        );

        dispatch(setAccountsFreezed(dataFreezed));

        dispatch(setIsLoadingAccountList(false));
      } catch (error) {
        if ((error as ApiError).name === 'CanceledError') return;

        errorHandler(error);
      }
    })();

    return () => {
      abortController.abort();
    };
  }, [dispatch]);
}
