import classNames from 'classnames';

import { ReactComponent as Chip } from '../assets/Chip.svg';
import { ReactComponent as DynamicLogo } from '../assets/Dynamic.svg';
import { ReactComponent as MastercardLogo } from '../assets/Mastercard.svg';
import { API_ACCOUNT_LIST_FILTER } from '../config/widgetConfig';
import { BaseAccount } from '../services/interface';

type Props = {
  account: BaseAccount;
};

export default function AccountCard({ account }: Props) {
  return (
    <div
      className={classNames(
        'account-card',
        API_ACCOUNT_LIST_FILTER,
      )}
    >
      <div className="d-flex justify-content-between align-items-start">
        <DynamicLogo height={18} width={80} />
        <Chip height={22} width={32} />
      </div>
      <div className="d-flex justify-content-between align-items-end">
        <div className="d-flex flex-column flex-grow-1">
          <small className="name">
            {account.name}
          </small>
          <div className="account-card-number">
            {account.accountNumber}
          </div>
        </div>
        <MastercardLogo height={32} width={44} />
      </div>
    </div>
  );
}
