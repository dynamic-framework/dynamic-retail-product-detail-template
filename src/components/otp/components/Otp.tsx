/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-props-no-spreading */

import {
  DButton,
  DInputPin,
  useDPortalContext,
} from '@dynamic-framework/ui-react';
import classNames from 'classnames';
import {
  PropsWithChildren,
  useCallback,
  useState,
} from 'react';
import { Trans, useTranslation } from 'react-i18next';

import OtpCountdown from './OtpCountdown';

const OTP_LENGTH = 6;

type Props = PropsWithChildren<{
  action: () => Promise<void> | void;
  isLoading?: boolean;
  classNameActions?: string;
  closeAfterEnd?: boolean;
}>;

export default function Otp(
  {
    classNameActions,
    action,
    children,
    isLoading,
    closeAfterEnd = false,
  }: Props,
) {
  const { closePortal } = useDPortalContext();
  const [otp, setOtp] = useState('');
  const [invalid, setInvalid] = useState(false);
  const { t } = useTranslation();

  const handler = useCallback(async () => {
    if (otp.length < OTP_LENGTH) {
      setInvalid(true);
      return;
    }

    setInvalid(false);

    await action();

    if (closeAfterEnd) {
      closePortal();
    }
  }, [
    otp.length,
    action,
    closeAfterEnd,
    closePortal,
  ]);

  return (
    <>
      {children}
      {t('otp.message')}
      <div className="d-flex flex-column gap-6 pb-4 px-3">
        <div className="d-flex flex-column gap-6">
          <DInputPin
            className="modal-otp-pin"
            characters={OTP_LENGTH}
            onChange={(e) => setOtp(e)}
            invalid={invalid && otp.length < OTP_LENGTH}
            placeholder="0"
          />
          <OtpCountdown seconds={15} />
        </div>
        <hr className="m-0" />
        <div
          className={classNames(
            'd-flex flex-column gap-4',
            classNameActions || '',
          )}
        >
          <DButton
            text={t('otp.actions.continue')}
            onClick={handler}
            loading={isLoading}
          />
          <Trans
            i18nKey="otp.problems"
            components={{
              a: <a
                href={t('otp.helpLink')}
                className="link-primary text-nowrap"
                target="_blank"
                rel="noreferrer"
              />,
              p: <p
                className="mb-0 text-center"
              />,
            }}
          />
        </div>
      </div>
    </>
  );
}
