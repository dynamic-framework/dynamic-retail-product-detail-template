import { DateTime } from 'luxon';
import classnames from 'classnames';
import {
  useModalContext,
  useFormatCurrency,
} from '@modyo-dynamic/modyo-design-system-react';
import type { Product, Transaction } from '@modyo-dynamic/modyo-service-retail';

import { useTranslation } from 'react-i18next';
import useTransactions from '../hooks/useTransactions';
import TransactionsListLoader from './loaders/TransactionsListLoader';
import { useAppSelector } from '../store/hooks';
import { getFilterTransactions } from '../store/selectors';
import { TransactionListFilter } from './TransactionListFilter';
import { FORMAT_DATE_FULL } from '../config/widgetConfig';

type Props = {
  loading: boolean;
  product: Product;
};

export default function TransactionsList({ loading, product }: Props) {
  const { openModal } = useModalContext();

  const { query } = useAppSelector(getFilterTransactions);
  const formatCurrency = useFormatCurrency();
  const { t } = useTranslation();

  const {
    loading: loadingTransactions,
    transactions,
    filteredTransactions,
  } = useTransactions(product.id, product.queryType);

  const detailTransaction = (transaction: Transaction) => {
    openModal('detailTransaction', { payload: { transaction } });
  };

  const emptyTransactionsText = () => {
    if (query !== '') {
      return t('noData.noQueryPayments', { search: query });
    }
    return t('noData.noPayments');
  };

  if (loading || loadingTransactions) {
    return <TransactionsListLoader />;
  }

  return (
    <div className="row overflow-hidden">
      <div className="col-12 my-3">
        <TransactionListFilter transactions={transactions} />
      </div>
      <div className="col-12 p-0">
        {(transactions.length === 0 || filteredTransactions.length === 0) && (
          <div className={classnames(
            'd-flex flex-column justify-content-center align-items-center',
            'w-100 my-4 gap-4 text-light-emphasis',
          )}
          >
            <span>{emptyTransactionsText()}</span>
            <img
              className="no-transactions"
              src="https://cloud.modyocdn.com/uploads/c49dfe12-4532-42a3-9dd7-2a07ce0bd82b/original/newCalendar.png"
              alt="Empty transactions"
            />
          </div>

        )}
        <div className="px-3">
          {filteredTransactions.map((transaction) => (
            <div
              className="d-flex w-100 cursor-pointer p-3 border-bottom border-gray-200 align-items-center"
              onClick={() => detailTransaction(transaction)}
              key={`transaction-${transaction.id}`}
              role="button"
              tabIndex={0}
              onKeyDown={() => {}}
            >
              <div className="flex-grow-1">
                <p className="fs-6 transaction-name">{transaction.name}</p>
                <small className="sp text-gray-700">
                  {DateTime.fromISO(transaction.date).toFormat(FORMAT_DATE_FULL)}
                </small>
              </div>
              <p className={`fs-6 ${transaction.amount > 0 ? 'text-green-300' : 'text-danger'}`}>
                {formatCurrency.format(transaction.amount)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
