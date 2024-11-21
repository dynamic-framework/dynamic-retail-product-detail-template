import {
  DPaginator,
  DListGroup,
  useDPortalContext,
} from '@dynamic-framework/ui-react';
import classnames from 'classnames';
import { DateTime } from 'luxon';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { FORMAT_DATE_FULL } from '../config/widgetConfig';
import usePaginator from '../hooks/usePaginator';
import type { PortalAvailablePayload } from '../interface';
import useActivitiesEffect from '../services/hooks/useActivitiesEffect';
import { Account, Activity } from '../services/interface';
import { useAppSelector } from '../store/hooks';
import { getFilterActivities, getAccountSelected } from '../store/selectors';

import { ActivityListFilter } from './ActivityListFilter';
import ListItemMovement from './ListItemMovement';
import AccountListLoader from './loaders/AccountListLoader';

export default function ActivityList() {
  const { t } = useTranslation();
  const { openPortal } = useDPortalContext<PortalAvailablePayload>();

  const account = useAppSelector(getAccountSelected) as Account;
  const { query } = useAppSelector(getFilterActivities);

  const {
    loading,
    activities,
    filteredActivities,
  } = useActivitiesEffect(account.baseType, account.id);

  const openActivityDetail = (activity: Activity) => {
    openPortal('modalActivityDetail', { activity });
  };

  const {
    callback,
    currentPage,
    data,
    totalPages,
  } = usePaginator(filteredActivities, 7);

  const emptyTransactionsText = useMemo(() => {
    if (query !== '') {
      return t('noData.noQueryPayments', { search: query });
    }
    return t('noData.noPayments');
  }, [t, query]);

  if (loading) {
    return <AccountListLoader />;
  }

  return (
    <>
      <ActivityListFilter activities={activities} />
      {activities.length === 0 && (
        <div className={classnames(
          'd-flex flex-column justify-content-center align-items-center',
          'w-100 my-6 gap-6 text-gray-500',
        )}
        >
          <span>{emptyTransactionsText}</span>
          <img
            className="no-transactions"
            src="https://cloud.modyocdn.com/uploads/c49dfe12-4532-42a3-9dd7-2a07ce0bd82b/original/newCalendar.png"
            alt="Empty transactions"
          />
        </div>

      )}
      <DListGroup flush>
        {data.map((activity) => (
          <ListItemMovement
            key={`activity-${activity.id}`}
            openModal={() => openActivityDetail(activity)}
            amount={activity.amount}
            date={DateTime.fromISO(activity.date).toFormat(FORMAT_DATE_FULL)}
            description={activity.name}
            className="border-light"
          />
        ))}
      </DListGroup>
      <div className="d-flex flex-grow-1 justify-content-center py-4">
        <DPaginator
          page={currentPage}
          total={totalPages}
          onPageChange={(page: number) => callback(page)}
          maxWidth={375}
        />
      </div>
    </>
  );
}
