import { useFormatCurrency } from '@dynamic-framework/ui-react';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';

import { DETAIL_NO_VALUE, FORMAT_DATE } from '../config/widgetConfig';
import type { LoanAccount } from '../services/interface';

import ItemDetail from './ItemDetail';
import ItemTitle from './ItemTitle';

type Props = {
  account: LoanAccount;
  className?: string;
};

export default function AccountDetailCreditCard({ account, className }: Props) {
  const { t } = useTranslation();
  const { format } = useFormatCurrency();

  return (
    <div className={className}>
      <ItemTitle
        text={t('collapse.details.availableCredit')}
        value={account.balanceRemaining ? format(account.balanceRemaining) : DETAIL_NO_VALUE}
        freeze={account.freeze}
      />
      <div className="d-flex flex-column">
        <ItemDetail
          text={t('collapse.details.minimumPayment')}
          value={account.due ? format(account.due) : DETAIL_NO_VALUE}
        />
        <ItemDetail
          text={t('collapse.details.paymentDate')}
          value={(
          account.paymentNextDueDate
            ? DateTime.fromISO(account.paymentNextDueDate).toFormat(FORMAT_DATE)
            : DETAIL_NO_VALUE
        )}
        />
        <ItemDetail
          text={t('collapse.details.totalPayment')}
          value={account.balanceOwed ? format(account.balanceOwed) : DETAIL_NO_VALUE}
        />
      </div>
    </div>
  );
}
