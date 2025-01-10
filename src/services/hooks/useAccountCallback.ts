import { useCallback, useMemo } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getAccounts, getAccountSelected } from '../../store/selectors';
import { setAccountSelected, setIsLoadingAccountDetail } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import type { Account, BaseAccount } from '../interface';
import { AccountRepository } from '../repositories';
import getAccountIdQueryString from '../utils/getAccountIdQueryString';
import setAccountIdQueryString from '../utils/setAccountIdQueryString';

export default function useAccountCallback() {
  const dispatch = useAppDispatch();

  const accounts = useAppSelector(getAccounts);
  const accountSelected = useAppSelector(getAccountSelected);

  const accountFromList = useMemo<BaseAccount | undefined>(() => {
    const accountId = getAccountIdQueryString();
    return accounts.find(({ id }) => id === accountId) ?? accounts[0];
  }, [accounts]);

  const selected = useMemo(
    () => accountSelected || accountFromList,
    [accountSelected, accountFromList],
  );

  const select = useCallback(async (account: Account) => {
    try {
      dispatch(setIsLoadingAccountDetail(true));
      const data = await AccountRepository.get(
        {
          account,
        },
      );
      dispatch(setAccountSelected(data));
      dispatch(setIsLoadingAccountDetail(false));

      setAccountIdQueryString(data.id);
    } catch (error) {
      dispatch(setIsLoadingAccountDetail(false));
      errorHandler(error);
      throw error;
    }
  }, [dispatch]);

  const callback = useCallback(async (account: Account) => {
    if (!accountSelected || accountSelected.id !== account.id) {
      await select(account);
    }
  }, [select, accountSelected]);

  return {
    callback,
    selected,
  };
}
