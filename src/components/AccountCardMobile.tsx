import { DBadge } from '@dynamic-framework/ui-react';
import classNames from 'classnames';

import { API_ACCOUNT_LIST_FILTER } from '../config/widgetConfig';
import { AccountType } from '../services/config';
import { Account, DepositAccount, LoanAccount } from '../services/interface';

import AccountDetailChecking from './AccountDetailChecking';
import AccountDetailCreditCard from './AccountDetailCreditCard';
import AccountDetailSaving from './AccountDetailSaving';

type Props = {
  account: Account;
};

export default function AccountCardMobile({ account }: Props) {
  return (
    <div
      className={classNames(
        'd-flex d-lg-none gap-4 py-6',
      )}
    >
      <div className="d-flex flex-column flex-grow-1">
        <div>
          {account?.type === AccountType.Saving && (
            <AccountDetailSaving account={account as DepositAccount} />
          )}
          {account?.type === AccountType.Checking && (
            <AccountDetailChecking account={account as DepositAccount} />
          )}
          {account?.type === AccountType.CreditCard && (
            <AccountDetailCreditCard account={account as LoanAccount} />
          )}
        </div>
      </div>
      <div className="d-flex flex-column gap-2">
        <div
          className={classNames(
            'account-card mobile',
            API_ACCOUNT_LIST_FILTER,
          )}
        />
        <DBadge
          text="Master 1234"
          soft
          theme="secondary"
          className="badge-card"
        />
      </div>
    </div>
  );
}
