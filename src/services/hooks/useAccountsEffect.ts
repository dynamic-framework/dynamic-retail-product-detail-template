import { useEffect } from 'react';

import { API_ACCOUNT_LIST_FILTER } from '../../config/widgetConfig';
import { useAppDispatch } from '../../store/hooks';
import {
  setAccounts,
  setAccountsFreezed,
  setIsLoadingAccountList,
} from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import { AccountTypeConfig } from '../config';
import { AccountRepository } from '../repositories';
import ApiError from '../utils/ApiError';

type ApiAccountListFilter = keyof typeof AccountTypeConfig;

export default function useAccountsEffect() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const abortController = new AbortController();
    const { apiType } = AccountTypeConfig[API_ACCOUNT_LIST_FILTER as ApiAccountListFilter];

    (async () => {
      dispatch(setIsLoadingAccountList(true));

      try {
        const data = await AccountRepository.list(
          {
            apiAccountType: apiType,
            config: { abortSignal: abortController.signal },
          },
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
