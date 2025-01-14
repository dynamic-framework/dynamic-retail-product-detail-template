import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getActivities, getFilteredActivities } from '../../store/selectors';
import { setActivities } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import type { Account } from '../interface';
import { ActivityRepository } from '../repositories';
import ApiError from '../utils/ApiError';

export default function useActivitiesEffect(account: Account, scheduled?: boolean) {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const activities = useAppSelector(getActivities);
  const filteredActivities = useAppSelector(getFilteredActivities);

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      setLoading(true);
      try {
        const data = await ActivityRepository.list(
          {
            account,
            upcoming: scheduled,
            config: {
              abortSignal: abortController.signal,
            },
          },
        );
        dispatch(setActivities(data));
        setLoading(false);
      } catch (error) {
        if ((error as ApiError).name === 'CanceledError') return;

        errorHandler(error);
      }
    })();
    return () => {
      abortController.abort();
    };
  }, [account, dispatch, scheduled]);

  return {
    loading,
    activities,
    filteredActivities,
  };
}
