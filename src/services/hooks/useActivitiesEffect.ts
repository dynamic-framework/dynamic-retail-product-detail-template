import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getActivities, getSelectedPage } from '../../store/selectors';
import { setActivities, setMetadata } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import type { Account } from '../interface';
import { ActivityRepository } from '../repositories';
import ApiError from '../utils/ApiError';

export default function useActivitiesEffect(account: Account, scheduled?: boolean) {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const activities = useAppSelector(getActivities);
  const selectedPage = useAppSelector(getSelectedPage);

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      setLoading(true);
      try {
        const { data, metadata } = await ActivityRepository.list(
          {
            account,
            upcoming: scheduled,
            page: selectedPage,
            config: {
              abortSignal: abortController.signal,
            },
          },
        );
        dispatch(setActivities(data));
        dispatch(setMetadata(metadata));

        setLoading(false);
      } catch (error) {
        if ((error as ApiError).name === 'CanceledError') return;

        errorHandler(error);
      }
    })();
    return () => {
      abortController.abort();
    };
  }, [account, dispatch, scheduled, selectedPage]);

  return {
    loading,
    activities,
  };
}
