import { DCreditCard } from '@dynamic-framework/ui-react';

import { API_ACCOUNT_LIST_FILTER } from '../config/widgetConfig';
import { BaseAccount } from '../services/interface';

type Props = {
  account: BaseAccount;
};

export default function AccountCard({ account }: Props) {
  return (
    <DCreditCard
      cardNumber={account.accountNumber}
      nameOnCard={account.alias}
      className={API_ACCOUNT_LIST_FILTER}
    />
  );
}
