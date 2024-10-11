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
import ComplainDetailItem from '../ComplainDetailItem';

export default function ModalComplainDetail(
  {
    payload:
    { activity },
  }: PortalProps<PortalAvailablePayload['modalComplainDetail']>,
) {
  const { closePortal } = useDPortalContext();
  const { t } = useTranslation();
  const { format } = useFormatCurrency();
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
        <ComplainDetailItem
          i18nKey="modal.complain.date"
          value={DateTime.fromISO(activity.date).toFormat(FORMAT_DATE_FULL)}
        />
        <ComplainDetailItem
          i18nKey="modal.complain.amount"
          value={format(activity.amount)}
        />
        <ComplainDetailItem
          i18nKey="modal.complain.trxNumber"
          value={activity.id}
        />
        <ComplainDetailItem
          i18nKey="modal.complain.situation"
        />
        <ComplainDetailItem
          i18nKey="modal.complain.description"
        />
        <ComplainDetailItem
          i18nKey="modal.complain.state"
        />
      </DModal.Body>
      <DModal.Footer />
    </DModal>
  );
}
