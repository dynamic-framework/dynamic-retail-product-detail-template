import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getQueryFilter, getSelectedPage } from '../../store/selectors';
import { setMetadata } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import type { Account, Activity } from '../interface';
import { ActivityRepository } from '../repositories';
import ApiError from '../utils/ApiError';

export default function useActivitiesEffect(account: Account, scheduled?: boolean) {
  const [loading, setLoading] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const query = useAppSelector(getQueryFilter);
  const selectedPage = useAppSelector(getSelectedPage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      setLoading(true);
      try {
        const { data, metadata } = await ActivityRepository.list(
          {
            account,
            query,
            upcoming: scheduled,
            page: selectedPage,
            config: {
              abortSignal: abortController.signal,
            },
          },
        );

        setActivities(data);
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
  }, [account, dispatch, scheduled, selectedPage, query]);

  return {
    loading,
    activities,
  };
}
