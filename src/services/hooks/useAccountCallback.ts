import { useCallback } from 'react';

import { AccountRepository } from '../repositories';
import { setIsLoadingSelectedAccount, setSelectedAccount } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import { getIsLoading, getSelectedAccount } from '../../store/selectors';

import type { Account } from '../interface';
import setAccountIdQueryString from '../utils/setAccountIdQueryString';

export default function useAccountCallback() {
  const dispatch = useAppDispatch();

  const loading = useAppSelector(getIsLoading);
  // we know that at this point the account exists.
  const selected = useAppSelector(getSelectedAccount) as Account;

  const callback = useCallback(async (accountBaseType: Account['baseType'], accountId: Account['id']) => {
    try {
      dispatch(setIsLoadingSelectedAccount(true));
      dispatch(setSelectedAccount(undefined));

      const data = await AccountRepository.get(accountBaseType, accountId);
      dispatch(setSelectedAccount(data));
      dispatch(setIsLoadingSelectedAccount(false));

      setAccountIdQueryString(data.id);
    } catch (error) {
      dispatch(setIsLoadingSelectedAccount(false));
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
