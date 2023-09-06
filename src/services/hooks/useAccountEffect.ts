import { useEffect } from 'react';

import { AccountRepository } from '../repositories';
import {
  setAccountSelected,
  setIsLoadingAccountDetail,
} from '../../store/slice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAccounts } from '../../store/selectors';
import errorHandler from '../../utils/errorHandler';
import setAccountIdQueryString from '../utils/setAccountIdQueryString';
import getAccountIdQueryString from '../utils/getAccountIdQueryString';

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
            account.baseType,
            account.id,
            { abortSignal: abortController.signal },
          );
          dispatch(setAccountSelected(completeAccount));
          dispatch(setIsLoadingAccountDetail(false));
        } catch (error) {
          errorHandler(error);
        }
      })();
    }

    return () => {
      abortController.abort();
    };
  }, [accounts, dispatch]);
}
