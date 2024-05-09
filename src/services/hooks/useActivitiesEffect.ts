import { useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { getActivities, getFilteredActivities } from '../../store/selectors';
import { setActivities } from '../../store/slice';
import errorHandler from '../../utils/errorHandler';
import type { Account } from '../interface';
import { ActivityRepository } from '../repositories';

export default function useActivitiesEffect(accountBaseType: Account['baseType'], accountId: Account['id']) {
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const activities = useAppSelector(getActivities);
  const filteredActivities = useAppSelector(getFilteredActivities);

  useEffect(() => {
    const abortController = new AbortController();

    (async () => {
      setLoading(true);
      try {
        const data = await ActivityRepository.list(accountBaseType, accountId);
        dispatch(setActivities(data));
        setLoading(false);
      } catch (error) {
        errorHandler(error);
      }
    })();
    return () => {
      abortController.abort();
    };
  }, [accountBaseType, accountId, dispatch]);

  return {
    loading,
    activities,
    filteredActivities,
  };
}
