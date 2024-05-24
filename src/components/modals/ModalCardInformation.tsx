import {
  DIcon,
  DModal,
  useDPortalContext,
} from '@dynamic-framework/ui-react';
import { useTranslation } from 'react-i18next';

import useCVC from '../../hooks/useCVC';
import { Account } from '../../services/interface';
import { useAppSelector } from '../../store/hooks';
import { getAccountSelected } from '../../store/selectors';
import AccountCard from '../AccountCard';
import ItemCardInfo from '../ItemCardInfo';
import CircularLoaderWidthTimer from '../loaders/CircularLoaderWithTimer';

const DURATION = 20;

export default function ModalCardInformation() {
  const { t } = useTranslation();
  const { closePortal } = useDPortalContext();

  const account = useAppSelector(getAccountSelected) as Account;

  const cvc = useCVC(DURATION);

  return (
    <DModal
      name="modalOTP"
      centered
      staticBackdrop
    >
      <DModal.Header
        onClose={closePortal}
        showCloseButton
      >
        <h5 className="fw-bold">{t('cardInfo.title')}</h5>
      </DModal.Header>
      <DModal.Body className="p-8">
        <div className="mb-8 rounded bg-gray-100 p-10">
          <AccountCard account={account} />
          <div className="text-center mt-2">
            <small className="d-inline-flex gap-2 align-items-center">
              <DIcon
                icon="circle-fill"
                theme="success"
                size="8px"
              />
              <span>Active</span>
            </small>
          </div>
        </div>
        <ItemCardInfo
          name={t('cardInfo.cardHolderName')}
          value={account?.alias}
        />
        <ItemCardInfo
          name={t('cardInfo.cardNumber')}
          value={account?.accountNumber}
        />
        <ItemCardInfo
          name={t('cardInfo.validUntil')}
          value={account?.accountNumber}
        />
        <ItemCardInfo
          name={t('cardInfo.cvc')}
          value={cvc.cvc}
        />
        <div className="d-flex gap-2">
          <CircularLoaderWidthTimer size={20} duration={DURATION} />
          <p className="text-gray-500">
            {`${t('cardInfo.cvcWillChange')} ${cvc.secondsLeft} ${t('cardInfo.seconds')}`}
          </p>
        </div>
      </DModal.Body>
    </DModal>
  );
}
