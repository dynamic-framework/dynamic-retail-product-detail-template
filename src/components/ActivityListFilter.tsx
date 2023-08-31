import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import {
  MButton,
  MInputSearch,
  useOffcanvasContext,
} from '@dynamic-framework/ui-react';

import { useAppSelector, useAppDispatch } from '../store/hooks';
import type { Activity } from '../services/interface';
import { getFilterActivities } from '../store/selectors';
import { setQueryFilterActivities } from '../store/slice';

type Prop = {
  activities: Array<Activity>,
};

export function ActivityListFilter({ activities }: Prop) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { openOffcanvas } = useOffcanvasContext();
  const { query } = useAppSelector(getFilterActivities);

  const inputSearchHandler = useCallback(({ detail }: CustomEvent<string>) => {
    dispatch(setQueryFilterActivities(detail));
  }, [dispatch]);

  return (
    <>
      <div className="d-flex d-lg-none align-items-center pb-2 ps-1">
        <p className="text-gray-600">{t('filters.filterBy')}</p>
      </div>
      <div className="d-flex align-items-stretch gap-4">
        <div className="d-none d-lg-flex align-items-center">
          <p className="text-gray-600">{t('filters.filterBy')}</p>
        </div>
        <MInputSearch
          mId="inputSearch"
          value={query}
          isDisabled={activities.length === 0}
          placeholder={t('filters.search')}
          onMChange={inputSearchHandler}
        />
        <MButton
          className="btn-filters"
          theme="secondary"
          variant="outline"
          iconEnd="filter"
          onMClick={() => openOffcanvas('advancedFilters')}
        />
      </div>
    </>
  );
}
