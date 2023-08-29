import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import { Account } from '../services/interface';
import { API_ACCOUNT_LIST_FILTER } from '../config/widgetConfig';

type Props = {
  account: Account;
};

export default function AccountCard({ account }: Props) {
  const { t } = useTranslation();
  return (
    <div
      className={classNames('account-card', API_ACCOUNT_LIST_FILTER)}
    >
      <div className="account-card-icons">
        <small>Icons...</small>
      </div>
      <div className="account-card-number">
        {account.accountNumber}
      </div>
      <div className="account-card-details">
        <div className="d-flex flex-column flex-grow-1">
          {API_ACCOUNT_LIST_FILTER === 'credit-card' && (
            <small>
              {t('card.name')}
            </small>
          )}
          <span className="name">
            {account.name}
          </span>
        </div>
        {API_ACCOUNT_LIST_FILTER === 'credit-card' && (
          <div className="d-flex flex-column">
            <small>
              {t('card.date')}
            </small>
            <span className="date">
              01/22
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
