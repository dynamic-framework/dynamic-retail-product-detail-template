import {
  DListGroup,
  DPaginator,
  useDPortalContext,
} from '@dynamic-framework/ui-react';
import classnames from 'classnames';
import { DateTime } from 'luxon';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { FORMAT_DATE_FULL } from '../config/widgetConfig';
import useSelectedPage from '../hooks/useSelectedPage';
import type { PortalAvailablePayload } from '../interface';
import useActivitiesEffect from '../services/hooks/useActivitiesEffect';
import { Account, Activity } from '../services/interface';
import { useAppSelector } from '../store/hooks';
import {
  getQueryFilter,
  getAccountSelected,
  getMetadata,
} from '../store/selectors';

import Filters from './Filters';
import ListItemMovement from './ListItemMovement';
import AccountListLoader from './loaders/ListLoader';

type Props = {
  scheduled?: boolean;
};

export default function ActivityList({ scheduled }: Props) {
  const { t } = useTranslation();
  const { openPortal } = useDPortalContext<PortalAvailablePayload>();

  const account = useAppSelector(getAccountSelected) as Account;
  const query = useAppSelector(getQueryFilter);
  const metadata = useAppSelector(getMetadata);

  const {
    loading,
    activities,
  } = useActivitiesEffect(account, scheduled);

  const openActivityDetail = (activity: Activity) => {
    openPortal('modalActivityDetail', { activity });
  };

  const { selectedPageHandler } = useSelectedPage();

  const emptyTransactionsText = useMemo(() => {
    if (query !== '') {
      return t('noData.noQueryPayments', { search: query });
    }
    return t('noData.noPayments');
  }, [t, query]);

  return (
    <>
      <Filters
        disabled={activities.length === 0}
        offcanvasName="offcanvasAdvancedFilters"
      />
      {loading && <AccountListLoader />}
      {(!loading && activities.length === 0) && (
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
      {(!loading && activities.length > 0) && (
      <>
        <DListGroup flush>
          {activities.map((activity) => (
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
            page={metadata.page}
            total={metadata.totalPages}
            onPageChange={selectedPageHandler}
            maxWidth={375}
          />
        </div>
      </>
      )}
    </>
  );
}
