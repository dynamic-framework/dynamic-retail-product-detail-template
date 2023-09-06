import { useEffect } from 'react';

import { AccountRepository } from '../repositories';
import { useAppDispatch } from '../../store/hooks';
import { API_ACCOUNT_LIST_FILTER } from '../../config/widgetConfig';
import { AccountType } from '../config';
import { setAccounts, setIsLoadingAccountList } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';

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
