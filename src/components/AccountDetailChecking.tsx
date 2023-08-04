import { useTranslation } from 'react-i18next';
import { useFormatCurrency } from '@dynamic-framework/ui-react';

import ItemTitle from './ItemTitle';
import ItemDetail from './ItemDetail';
import { DETAIL_NO_VALUE } from '../config/widgetConfig';

import type { DepositAccount } from '../services/interface';

type Props = {
  account: DepositAccount;
};

export default function AccountDetailChecking({ account }: Props) {
  const { t } = useTranslation();
  const { format } = useFormatCurrency();

  return (
    <>
      <ItemTitle
        text={t('collapse.details.totalBalance')}
        value={account.balanceTotal ? format(account.balanceTotal) : DETAIL_NO_VALUE}
      />
      <hr className="m-0" />
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
          text={t('collapse.details.overdraftAmount')}
          value={account.overdraftAvailable ? format(account.overdraftAvailable) : DETAIL_NO_VALUE}
        />
      </div>
    </>
  );
}
