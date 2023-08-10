import { DateTime } from 'luxon';
import classnames from 'classnames';
import { useMemo } from 'react';
import {
  useModalContext,
  useFormatCurrency,
} from '@dynamic-framework/ui-react';

import { useTranslation } from 'react-i18next';
import useActivitiesEffect from '../services/hooks/useActivitiesEffect';
import AccountListLoader from './loaders/AccountListLoader';
import { useAppSelector } from '../store/hooks';
import { ActivityListFilter } from './ActivityListFilter';
import { FORMAT_DATE_FULL } from '../config/widgetConfig';
import { getFilterActivities, getSelectedAccount } from '../store/selectors';
import { Account, Activity } from '../services/interface';

export default function ActivityList() {
  const formatCurrency = useFormatCurrency();
  const { t } = useTranslation();
  const { openModal } = useModalContext();

  const account = useAppSelector(getSelectedAccount) as Account;
  const { query } = useAppSelector(getFilterActivities);

  const {
    loading,
    activities,
    filteredActivities,
  } = useActivitiesEffect(account.baseType, account.id);

  const openActivityDetail = (activity: Activity) => {
    openModal('activityDetail', { payload: { activity } });
  };

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
    <div className="row overflow-hidden">
      <div className="col-12 my-3">
        <ActivityListFilter activities={activities} />
      </div>
      <div className="col-12 p-0">
        {(activities.length === 0 || activities.length === 0) && (
          <div className={classnames(
            'd-flex flex-column justify-content-center align-items-center',
            'w-100 my-4 gap-4 text-light-emphasis',
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
        <div className="px-3">
          {filteredActivities.map((activity) => (
            <div
              className="d-flex w-100 cursor-pointer p-3 border-bottom border-gray-200 align-items-center"
              onClick={() => openActivityDetail(activity)}
              key={`activity-${activity.id}`}
              role="button"
              tabIndex={0}
              onKeyDown={() => {}}
            >
              <div className="flex-grow-1">
                <p className="fs-6 transaction-name">{activity.name}</p>
                <small className="sp text-gray-700">
                  {DateTime.fromISO(activity.date).toFormat(FORMAT_DATE_FULL)}
                </small>
              </div>
              <p className={`fs-6 ${activity.amount > 0 ? 'text-green-300' : 'text-danger'}`}>
                {formatCurrency.format(activity.amount)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
