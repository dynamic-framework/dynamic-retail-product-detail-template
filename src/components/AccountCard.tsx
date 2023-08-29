import { MIcon } from '@dynamic-framework/ui-react';
import { Account } from '../services/interface';

type Props = {
  account: Account;
  background?: string;
};

export default function AccountCard({ account, background }: Props) {
  return (
    <div
      className="account-card"
      style={{ background }}
    >
      <div className="account-card-icons">
        <small>Icons...</small>
      </div>
      <div className="account-card-number">
        {account.accountNumber}
      </div>
      <div className="account-card-name">
        {account.name}
      </div>
    </div>
  );
}
