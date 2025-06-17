/* eslint-disable react/jsx-props-no-spreading */
import { DModal, useDPortalContext } from '@dynamic-framework/ui-react';
import { PropsWithChildren } from 'react';
import { useTranslation } from 'react-i18next';

import Otp from './components/Otp';

type Props = PropsWithChildren<{
  showClose?: boolean;
  action: () => Promise<void> | void;
  isLoading?: boolean;
  closeAfterEnd?: boolean;
}>;

export default function OtpModal(
  {
    action,
    children,
    isLoading,
    showClose = true,
    closeAfterEnd,
  }: Props,
) {
  const { closePortal } = useDPortalContext();

  const { t } = useTranslation();

  return (
    <DModal
      name="modalOtp"
      centered
      staticBackdrop
    >
      <DModal.Header
        showCloseButton={showClose}
        {...showClose && { onClose: closePortal }}
      >
        <h4>{t('otp.title')}</h4>
      </DModal.Header>
      <DModal.Body className="d-flex flex-column gap-6">
        <Otp
          isLoading={isLoading}
          action={action}
          closeAfterEnd={closeAfterEnd}
        >
          {children}
        </Otp>
      </DModal.Body>
    </DModal>
  );
}
