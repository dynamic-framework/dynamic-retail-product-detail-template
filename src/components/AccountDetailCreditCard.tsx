import { useTranslation } from 'react-i18next';
import { DateTime } from 'luxon';
import { useFormatCurrency } from '@dynamic-framework/ui-react';

import ItemTitle from './ItemTitle';
import ItemDetail from './ItemDetail';
import { DETAIL_NO_VALUE, FORMAT_DATE } from '../config/widgetConfig';

import type { LoanAccount } from '../services/interface';

type Props = {
  account: LoanAccount;
};

export default function AccountDetailCreditCard({ account }: Props) {
  const { t } = useTranslation();
  const { format } = useFormatCurrency();

  return (
    <>
      <ItemTitle
        text={t('collapse.details.availableCredit')}
        value={account.balanceRemaining ? format(account.balanceRemaining) : DETAIL_NO_VALUE}
      />
      <hr className="m-0" />
      <div className="d-flex flex-column">
        <ItemDetail
          text={t('collapse.details.minimumPayment')}
          value={account.due ? format(account.due) : DETAIL_NO_VALUE}
        />
        <ItemDetail
          text={t('collapse.details.totalPayment')}
          value={account.balanceOwed ? format(account.balanceOwed) : DETAIL_NO_VALUE}
        />
        <ItemDetail
          text={t('collapse.details.balance')}
          value={account.amount ? format(account.amount) : DETAIL_NO_VALUE}
        />
      </div>
      <hr className="m-0" />
      <ItemTitle
        text={t('collapse.details.paymentDate')}
      />
      <ItemDetail
        text={t('collapse.details.paymentDate')}
        value={(
          account.paymentNextDueDate
            ? DateTime.fromISO(account.paymentNextDueDate).toFormat(FORMAT_DATE)
            : DETAIL_NO_VALUE
        )}
      />
    </>
  );
}
