import {
  DModal,
  PortalProps,
  useDPortalContext,
  useFormatCurrency,
} from '@dynamic-framework/ui-react';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';

import { FORMAT_DATE_FULL } from '../../config/widgetConfig';
import { PortalAvailablePayload } from '../../interface';
import DisputeDetailItem from '../DisputeDetailItem';

export default function ModalDisputeDetail(
  {
    payload:
    { dispute },
  }: PortalProps<PortalAvailablePayload['modalDisputeDetail']>,
) {
  const { closePortal } = useDPortalContext();
  const { t } = useTranslation();
  const { format } = useFormatCurrency();
  return (
    <DModal
      name="modalDisputeDetail"
      centered
      staticBackdrop
    >
      <DModal.Header
        showCloseButton
        onClose={closePortal}
      >
        <h4 className="text-capitalize">
          {t('modal.dispute.title', { value: dispute.name })}
        </h4>
      </DModal.Header>
      <DModal.Body className="d-flex flex-column">
        <DisputeDetailItem
          i18nKey="modal.dispute.date"
          value={DateTime.fromISO(dispute.date).toFormat(FORMAT_DATE_FULL)}
        />
        <DisputeDetailItem
          i18nKey="modal.dispute.amount"
          value={format(dispute.amount)}
        />
        <DisputeDetailItem
          i18nKey="modal.dispute.trxNumber"
          value={dispute.id}
        />
        <DisputeDetailItem
          i18nKey="modal.dispute.situation"
        />
        <DisputeDetailItem
          i18nKey="modal.dispute.description"
        />
        <DisputeDetailItem
          i18nKey="modal.dispute.state"
        />
      </DModal.Body>
      <DModal.Footer />
    </DModal>
  );
}
