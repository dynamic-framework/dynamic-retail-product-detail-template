import { useDPortalContext, PortalProps } from '@dynamic-framework/ui-react';
import { useTranslation } from 'react-i18next';

import { PortalAvailablePayload } from '../../interface';
import OtpModal from '../otp/OtpModal';

export default function ModalOTP(
  {
    payload: {
      callback,
    },
  }: PortalProps<PortalAvailablePayload['modalOTP']>,
) {
  const { t } = useTranslation();
  const { closePortal } = useDPortalContext();

  return (
    <OtpModal
      title={t('otp.title')}
      message={t('otp.message')}
      action={() => {
        closePortal();
        callback();
      }}
    />
  );
}
