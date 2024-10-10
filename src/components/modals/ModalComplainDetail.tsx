import {
  DBadge,
  DModal,
  PortalProps,
  useDPortalContext,
  useFormatCurrency,
} from '@dynamic-framework/ui-react';
import { DateTime } from 'luxon';
import { useCallback } from 'react';
import { Trans, useTranslation } from 'react-i18next';

import { FORMAT_DATE_FULL } from '../../config/widgetConfig';
import { PortalAvailablePayload } from '../../interface';

export default function ModalComplainDetail(
  {
    payload:
    { activity },
  }: PortalProps<PortalAvailablePayload['modalComplainDetail']>,
) {
  const { closePortal } = useDPortalContext();
  const { t } = useTranslation();
  const { format } = useFormatCurrency();

  const DetailItem = useCallback((
    i18nKey: string,
    value?: string,
  ) => (
    <div>
      <Trans
        i18nKey={i18nKey}
        values={{ value }}
        components={{
          bld: <strong />,
          cmp: <DBadge soft theme="success" />,
        }}
      />
    </div>
  ), []);

  return (
    <DModal
      name="modalComplainDetail"
      centered
      staticBackdrop
    >
      <DModal.Header
        showCloseButton
        onClose={closePortal}
      >
        <h4 className="text-capitalize">
          {t('modal.complain.title', { value: activity.name })}
        </h4>
      </DModal.Header>
      <DModal.Body className="d-flex flex-column">
        {DetailItem('modal.complain.date', DateTime.fromISO(activity.date).toFormat(FORMAT_DATE_FULL))}
        {DetailItem('modal.complain.amount', format(activity.amount))}
        {DetailItem('modal.complain.trxNumber', activity.id)}
        {DetailItem('modal.complain.situation')}
        {DetailItem('modal.complain.description')}
        {DetailItem('modal.complain.state')}
      </DModal.Body>
      <DModal.Footer />
    </DModal>
  );
}
