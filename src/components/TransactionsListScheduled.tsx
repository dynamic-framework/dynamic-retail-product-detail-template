import { DateTime } from 'luxon';
import classnames from 'classnames';
import { useFormatCurrency } from '@modyo-dynamic/modyo-design-system-react';
import type { Product } from '@modyo-dynamic/modyo-service-retail';

import { useTranslation } from 'react-i18next';
import useTransactionsScheduled from '../hooks/useTransactionsScheduled';
import TransactionsListScheduledLoader from './loaders/TransactionsListScheduledLoader';
import { FORMAT_DATE_FULL } from '../config/widgetConfig';

type Props = {
  loading: boolean;
  product: Product;
};

export default function TransactionsListScheduled({ loading, product }: Props) {
  const { t } = useTranslation();
  const formatCurrency = useFormatCurrency();
  const {
    loading: loadingTransactions,
    transactions,
  } = useTransactionsScheduled(product.id);

  if (loading || loadingTransactions) {
    return <TransactionsListScheduledLoader />;
  }

  if (transactions.length === 0) {
    return (
      <div className={classnames(
        'd-flex flex-column justify-content-center align-items-center',
        'w-100 my-4 gap-4 text-light-emphasis',
      )}
      >
        <p className="text-gray fw-bold">{t('noData.noUpcomingPayments')}</p>
        <img
          className="no-transactions"
          src="https://cloud.modyocdn.com/uploads/c49dfe12-4532-42a3-9dd7-2a07ce0bd82b/original/newCalendar.png"
          alt="Empty scheduled transactions"
        />
      </div>
    );
  }

  return (
    <div className="px-3 py-4">
      {transactions.map((transaction) => (
        <div
          className="d-flex w-100 cursor-pointer py-3 border-bottom border-gray-200 align-items-center"
          key={`scheduled-transaction-${transaction.id}`}
        >
          <div className="flex-grow-1">
            <p className="fs-6 fw-bold">{transaction.name}</p>
            <small className="text-light-emphasis">
              {DateTime.fromISO(transaction.date).toFormat(FORMAT_DATE_FULL)}
            </small>
          </div>
          <p className={`fs-6 fw-bold ${transaction.amount > 0 ? 'text-green-300' : 'text-light-emphasis'}`}>
            {formatCurrency.format(transaction.amount)}
          </p>
        </div>
      ))}
    </div>
  );
}
