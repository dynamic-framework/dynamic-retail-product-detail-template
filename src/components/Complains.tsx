import {
  DList,
  DPaginator,
} from '@dynamic-framework/ui-react';
import classnames from 'classnames';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import usePaginator from '../hooks/usePaginator';
import useActivitiesEffect from '../services/hooks/useActivitiesEffect';
import { Account } from '../services/interface';
import { useAppSelector } from '../store/hooks';
import { getAccountSelected, getFilterActivities } from '../store/selectors';

import { ActivityListFilter } from './ActivityListFilter';
import ListItemComplain from './ListItemComplain';
import AccountListLoader from './loaders/AccountListLoader';
import NewComplainLink from './NewComplainLink';

export default function Complains() {
  const { t } = useTranslation();
  const account = useAppSelector(getAccountSelected) as Account;
  const { query } = useAppSelector(getFilterActivities);

  const {
    loading,
    activities,
    filteredActivities,
  } = useActivitiesEffect(account.baseType, account.id);

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
    <div>
      <ActivityListFilter
        activities={activities}
        otherOptions={(
          <div className="ms-auto d-none d-lg-flex">
            <NewComplainLink account={account} />
          </div>
        )}
      />
      <div className="d-flex d-lg-none justify-content-center mb-4 mb-lg-0">
        <NewComplainLink account={account} />
      </div>
      {(activities.length < 1) && (
        <div
          className={classnames(
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
      <div>
        <DList flush>
          {data.map((activity) => (
            <ListItemComplain
              key={`activity-${activity.id}`}
              activity={activity}
            />
          ))}
        </DList>
        <div className="d-flex flex-grow-1 justify-content-center py-4">
          <DPaginator
            page={currentPage}
            total={totalPages}
            onPageChange={(page: number) => callback(page)}
          />
        </div>
      </div>
    </div>
  );
}
