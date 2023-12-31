import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  DButton,
  DInputSearch,
  useDOffcanvasContext,
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
  const { openOffcanvas } = useDOffcanvasContext();
  const { query } = useAppSelector(getFilterActivities);
  const [inputQuery, setInputQuery] = useState<string | undefined>(query);

  const inputSearchHandler = useCallback((value: string | undefined) => {
    setInputQuery(value);
    dispatch(setQueryFilterActivities(value || ''));
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
        <DInputSearch
          id="inputSearch"
          value={inputQuery}
          disabled={activities.length === 0}
          placeholder={t('filters.search')}
          onChange={inputSearchHandler}
        />
        <DButton
          className="btn-filters"
          theme="secondary"
          variant="outline"
          iconEnd="filter"
          onClick={() => openOffcanvas('advancedFilters', undefined)}
        />
      </div>
    </>
  );
}
