import {
  DModal,
  DButton,
  useDPortalContext,
  DInputPin,
  PortalProps,
} from '@dynamic-framework/ui-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { PortalAvailablePayload } from '../../interface';
import CountDownState from '../CountDownState';

export default function ModalOTP(
  {
    payload: {
      callback,
    },
  }: PortalProps<PortalAvailablePayload['modalOTP']>,
) {
  const { t } = useTranslation();
  const { closePortal } = useDPortalContext();
  const [pin, setPin] = useState<string>('');

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
        <h5 className="fw-bold">{t('modalOtp.title')}</h5>
      </DModal.Header>
      <DModal.Body className="py-3 px-5">
        <p className="text-gray-500">{t('modalOtp.sendCode')}</p>
        <DInputPin
          characters={6}
          hint={t('modalOtp.hint')}
          id="componentId1"
          onChange={(e) => setPin(e)}
          type="text"
          className="mb-8"
        />
        <div className="text-center text-gray-500 d-block">
          {t('modalOtp.getCode')}
          {' '}
          <CountDownState text={t('modalOtp.resend')} value={20} />
        </div>
      </DModal.Body>
      <DModal.Footer>
        <DButton
          text={t('cancel')}
          theme="secondary"
          variant="outline"
          className="d-grid"
          pill
          onClick={() => closePortal()}
        />
        <DButton
          text="validate"
          onClick={() => {
            closePortal();
            if (callback) callback();
          }}
          disabled={!pin || Number(pin.length) < 6}
          className="d-grid"
          pill
        />
      </DModal.Footer>
    </DModal>
  );
}
