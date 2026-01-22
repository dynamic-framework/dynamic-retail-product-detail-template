import {
  DCreditCard,
  DModal,
  useDPortalContext,
} from '@dynamic-framework/ui-react';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';

import { API_ACCOUNT_LIST_FILTER } from '../../config/widgetConfig';
import { Account } from '../../services/interface';
import { useAppSelector } from '../../store/hooks';
import { getAccountSelected } from '../../store/selectors';
import ItemCardInfo from '../ItemCardInfo';
import ItemCardInfoCVC from '../ItemCardInfoCVC';
import NumberCardInfo from '../NumberCardInfo';

export default function ModalCardInformation() {
  const { t } = useTranslation();
  const { closePortal } = useDPortalContext();
  const account = useAppSelector(getAccountSelected) as Account;

  return (
    <DModal
      name="modalCardInformation"
      centered
      staticBackdrop
      size="lg"
    >
      <DModal.Header
        onClose={closePortal}
        showCloseButton
      >
        <h5 className="fw-bold">{t('cardInfo.title')}</h5>
      </DModal.Header>
      <DModal.Body className="p-8">
        <div className="d-block d-lg-flex gap-4 align-items-start">
          <div className="flex-1">
            <ItemCardInfo
              name={t('cardInfo.cardHolderName')}
              value={account?.alias}
            />
            <ItemCardInfo
              name={t('cardInfo.cvc')}
              value={<NumberCardInfo cardNumber={account.cardSecurityCode} />}
            />
            <ItemCardInfo
              name={t('cardInfo.cardNumber')}
              value={<NumberCardInfo cardNumber={account.accountCompleteNumber} />}
            />
            <ItemCardInfo
              name={t('cardInfo.validUntil')}
              value={account.expiration}
            />
            {API_ACCOUNT_LIST_FILTER === 'credit-card' && <ItemCardInfoCVC expiryDate={account.expiryDate} />}
          </div>
          <div className="col">
            <DCreditCard
              name={account.name}
              brand={account.type}
              className={classNames(
                { 'card-freeze': account.freeze },
                account.type,
              )}
              number={account.accountNumber}
            />
            <div className="d-flex flex-column align-items-center mt-3">
              <small className="d-inline-flex gap-2 align-items-center mb-4">
                <span
                  style={{
                    width: 15,
                    height: 15,
                  }}
                  className={classNames(
                    account.freeze ? 'bg-warning-500' : 'bg-success-500',
                    'rounded-pill',
                  )}
                />
                <span>{account.freeze ? 'Freeze' : 'Active'}</span>
              </small>
            </div>
          </div>
        </div>
      </DModal.Body>
    </DModal>
  );
}
