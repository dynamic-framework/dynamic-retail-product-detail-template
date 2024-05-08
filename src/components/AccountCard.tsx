import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { API_ACCOUNT_LIST_FILTER } from '../config/widgetConfig';
import { BaseAccount } from '../services/interface';

type Props = {
  account: BaseAccount;
};

export default function AccountCard({ account }: Props) {
  const { t } = useTranslation();
  return (
    <div
      className={classNames('account-card', API_ACCOUNT_LIST_FILTER)}
    >
      {API_ACCOUNT_LIST_FILTER === 'credit-card' && (
        <div className="account-card-icons">
          <img
            src="https://cloud.modyocdn.com/uploads/389459e5-895d-485e-bffe-855e0eef0869/original/Chip.png"
            alt="Chip"
            width={38}
          />
          <img
            src="https://cloud.modyocdn.com/uploads/b3f99e99-8322-4f1f-aefc-c6c5de86b764/original/Mastercard.png"
            alt="Mastercard"
            width={40}
          />
        </div>
      )}
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
