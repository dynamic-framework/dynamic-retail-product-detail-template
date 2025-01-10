import {
  DButton,
  DInputSearch,
  useDPortalContext,
} from '@dynamic-framework/ui-react';
import {
  ReactNode,
  useCallback,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';

import type { Activity, Dispute } from '../services/interface';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { getFilterActivities } from '../store/selectors';
import { setQueryFilterActivities } from '../store/slice';

type Prop = {
  activities: Array<Activity | Dispute>,
  otherOptions?: ReactNode;
};

export function ActivityListFilter(
  {
    activities,
    otherOptions,
  }: Prop,
) {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const { openPortal } = useDPortalContext();
  const { query } = useAppSelector(getFilterActivities);
  const [inputQuery, setInputQuery] = useState<string | undefined>(query);

  const inputSearchHandler = useCallback((value: string | undefined) => {
    setInputQuery(value);
    dispatch(setQueryFilterActivities(value || ''));
  }, [dispatch]);

  return (
    <>
      <div className="d-flex d-lg-none align-items-center pb-2 ps-1">
        <p className="text-gray-600 mb-0">{t('filters.filterBy')}</p>
      </div>
      <div className="d-flex align-items-stretch gap-6 mb-4">
        <DInputSearch
          id="inputSearch"
          value={inputQuery}
          disabled={activities.length === 0}
          placeholder={t('filters.search')}
          onChange={inputSearchHandler}
        />
        <DButton
          variant="outline"
          iconStart="funnel"
          text={t('filter.title')}
          className="px-4"
          onClick={() => openPortal('offcanvasAdvancedFilters', undefined)}
        />
        {otherOptions}
      </div>
    </>
  );
}
