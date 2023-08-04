import { useCallback } from 'react';

import { AccountRepository } from '../repositories';
import { setIsLoadingAccounts, setSelectedAccount } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import { getIsLoadingAccounts, getSelectedAccount } from '../../store/selectors';

import type { Account } from '../interface';
import setAccountIdQueryString from '../utils/setAccountIdQueryString';

export default function useAccountCallback() {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(getIsLoadingAccounts);
  // we know that at this point the account exists.
  const selected = useAppSelector(getSelectedAccount) as Account;

  const callback = useCallback(async (accountBaseType: Account['baseType'], accountId: Account['id']) => {
    try {
      dispatch(setIsLoadingAccounts(true));
      dispatch(setSelectedAccount(undefined));

      const data = await AccountRepository.get(accountBaseType, accountId);
      dispatch(setSelectedAccount(data));
      dispatch(setIsLoadingAccounts(false));

      setAccountIdQueryString(data.id);
    } catch (error) {
      dispatch(setIsLoadingAccounts(false));
      errorHandler(error);
      throw error;
    }
  }, [dispatch]);

  return {
    loading,
    callback,
    selected,
  };
}
