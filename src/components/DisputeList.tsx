import { DList, DPaginator } from '@dynamic-framework/ui-react';
import classnames from 'classnames';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import useSelectedPage from '../hooks/useSelectedPage';
import useDisputesEffect from '../services/hooks/useDisputesEffect';
import { Account } from '../services/interface';
import { useAppSelector } from '../store/hooks';
import {
  getAccountSelected,
  getQueryFilter,
  getMetadata,
} from '../store/selectors';

import Filters from './Filters';
import ListItemDispute from './ListItemDispute';
import AccountListLoader from './loaders/ListLoader';
import NewDisputeLink from './NewDisputeLink';

export default function DisputeList() {
  const { t } = useTranslation();
  const account = useAppSelector(getAccountSelected) as Account;
  const query = useAppSelector(getQueryFilter);
  const metadata = useAppSelector(getMetadata);
  const { selectedPageHandler } = useSelectedPage();

  const {
    loading,
    disputes,
  } = useDisputesEffect(account);

  const emptyTransactionsText = useMemo(() => {
    if (query !== '') {
      return t('noData.noQueryPayments', { search: query });
    }
    return t('noData.noPayments');
  }, [t, query]);

  return (
    <>
      <Filters
        disabled={disputes.length === 0}
        offcanvasName="offcanvasAdvancedFilters"
        otherOptions={(
          <div className="ms-auto d-none d-lg-flex">
            <NewDisputeLink account={account} />
          </div>
        )}
      />
      <div className="d-flex d-lg-none justify-content-center mb-4 mb-lg-0">
        <NewDisputeLink account={account} />
      </div>
      {loading && <AccountListLoader />}
      {(!loading && disputes.length === 0) && (
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
      {(!loading && disputes.length > 0) && (
        <div>
          <DList flush>
            {disputes.map((dispute) => (
              <ListItemDispute
                key={`activity-${dispute.id}`}
                dispute={dispute}
              />
            ))}
          </DList>
          <div className="d-flex flex-grow-1 justify-content-center py-4">
            <DPaginator
              page={metadata.page}
              total={metadata.totalPages}
              onPageChange={selectedPageHandler}
            />
          </div>
        </div>
      )}
    </>
  );
}
