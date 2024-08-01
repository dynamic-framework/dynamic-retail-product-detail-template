import { useFormatCurrency } from '@dynamic-framework/ui-react';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';

import { DETAIL_NO_VALUE, FORMAT_DATE } from '../config/widgetConfig';
import type { LoanAccount } from '../services/interface';

import ItemDetail from './ItemDetail';
import ItemTitle from './ItemTitle';

type Props = {
  account: LoanAccount;
};

export default function AccountDetailLoan({ account }: Props) {
  const { t } = useTranslation();
  const { format } = useFormatCurrency();

  return (
    <>
      <ItemTitle
        text={t('collapse.details.outstandingBalance')}
        value={account.balanceOwed ? format(account.balanceOwed) : DETAIL_NO_VALUE}
        freeze={account.freeze}
      />
      <hr className="m-0 border-light" />
      <div className="d-flex flex-column">
        <ItemDetail
          text={t('collapse.details.nextPayment')}
          value={account.paymentDue ? format(account.paymentDue) : DETAIL_NO_VALUE}
        />
        <ItemDetail
          text={t('collapse.details.paymentNumber')}
          value={`
            ${account.paymentLastPaidInstallmentNumber ? account.paymentLastPaidInstallmentNumber : DETAIL_NO_VALUE}
            /
            ${account.installments ? account.installments : DETAIL_NO_VALUE}
          `}
        />
        <ItemDetail
          text={t('collapse.details.annualInterestRate')}
          value={account.interestRate ? `${account.interestRate}%` : DETAIL_NO_VALUE}
        />
        <ItemDetail
          text={t('collapse.details.paymentDate')}
          value={(
          account.paymentNextDueDate
            ? DateTime.fromISO(account.paymentNextDueDate).toFormat(FORMAT_DATE)
            : DETAIL_NO_VALUE
        )}
        />
      </div>
    </>
  );
}
