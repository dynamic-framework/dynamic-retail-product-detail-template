import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAccounts } from '../../store/selectors';
import {
  setAccountSelected,
  setIsLoadingAccountDetail,
} from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import { AccountRepository } from '../repositories';
import ApiError from '../utils/ApiError';
import getAccountIdQueryString from '../utils/getAccountIdQueryString';
import setAccountIdQueryString from '../utils/setAccountIdQueryString';

export default function useAccountEffect() {
  const dispatch = useAppDispatch();
  const accounts = useAppSelector(getAccounts);

  useEffect(() => {
    const abortController = new AbortController();

    if (accounts.length > 0) {
      (async () => {
        dispatch(setIsLoadingAccountDetail(true));

        try {
          const accountId = getAccountIdQueryString();
          const account = accounts.find(({ id }) => id === accountId) ?? accounts[0];

          if (!accountId && account) {
            setAccountIdQueryString(account.id);
          }

          const completeAccount = await AccountRepository.get(
            {
              account,
              config: { abortSignal: abortController.signal },
            },
          );
          dispatch(setAccountSelected(completeAccount));
          dispatch(setIsLoadingAccountDetail(false));
        } catch (error) {
          if ((error as ApiError).name === 'CanceledError') return;

          errorHandler(error);
        }
      })();
    }

    return () => {
      abortController.abort();
    };
  }, [accounts, dispatch]);
}
