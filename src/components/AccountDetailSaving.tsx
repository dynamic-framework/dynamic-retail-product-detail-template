import { useFormatCurrency } from '@dynamic-framework/ui-react';
import { useTranslation } from 'react-i18next';

import { DETAIL_NO_VALUE } from '../config/widgetConfig';
import type { DepositAccount } from '../services/interface';

import ItemDetail from './ItemDetail';
import ItemTitle from './ItemTitle';

type Props = {
  account: DepositAccount;
  className?: string;
};

export default function AccountDetailSaving({ account, className }: Props) {
  const { t } = useTranslation();
  const { format } = useFormatCurrency();

  return (
    <div className={className}>
      <ItemTitle
        text={t('collapse.details.totalBalance')}
        value={account.balanceTotal ? format(account.balanceTotal) : DETAIL_NO_VALUE}
        freeze={account.freeze}
      />
      <div className="d-flex flex-column">
        <ItemDetail
          text={t('collapse.details.availableAmount')}
          value={account.balanceAvailable ? format(account.balanceAvailable) : DETAIL_NO_VALUE}
        />
        <ItemDetail
          text={t('collapse.details.fundsOnHold')}
          value={account.balanceUnavailable ? format(account.balanceUnavailable) : DETAIL_NO_VALUE}
        />
        <ItemDetail
          text={t('collapse.details.interestRate')}
          value={account.interestRate ? `${account.interestRate}%` : DETAIL_NO_VALUE}
        />
      </div>
    </div>
  );
}
