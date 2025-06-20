import { useDPortalContext, PortalProps } from '@dynamic-framework/ui-react';

import { PortalAvailablePayload } from '../../interface';
import OtpModal from '../otp/OtpModal';

export default function ModalOtp(
  {
    payload: {
      callback,
    },
  }: PortalProps<PortalAvailablePayload['modalOtp']>,
) {
  const { closePortal } = useDPortalContext();

  return (
    <OtpModal
      action={() => {
        closePortal();
        callback();
      }}
    />
  );
}
