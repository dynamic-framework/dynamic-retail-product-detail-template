/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  DModal,
  DModalHeader,
  PortalProps,
  useFormatCurrency,
  useDPortalContext,
} from '@dynamic-framework/ui-react';
import classNames from 'classnames';
import { DateTime } from 'luxon';
import { useTranslation } from 'react-i18next';

import { FORMAT_DATE_FULL } from '../../config/widgetConfig';
import type { PortalAvailablePayload } from '../../interface';

export default function ModalActivityDetail(
  {
    payload: {
      activity,
    },
  }: PortalProps<PortalAvailablePayload['modalActivityDetail']>,
) {
  const { closePortal } = useDPortalContext();
  const formatCurrency = useFormatCurrency();
  const { t } = useTranslation();

  return (
    <DModal
      className="activity-detail-modal"
      name="modal"
      centered
    >
      <DModalHeader
        onClose={closePortal}
        className="px-6"
        showCloseButton
      >
        <h5 className="fw-bold flex-grow-1 activity-name text-wrap">
          {activity.name}
        </h5>
      </DModalHeader>
      <DModal.Body>
        <div className="d-flex flex-column gap-6">
          <div className="bg-gray-50 rounded-1 p-4">
            <div className="d-flex flex-column gap-1">
              <div className="d-flex align-items-center gap-1">
                <span className="fw-bold">
                  {t('modal.details.value')}
                  :
                </span>
                <span
                  className={classNames(
                    'flex-grow-1',
                    activity.amount > 0 ? 'text-success' : 'text-danger',
                  )}
                >
                  {formatCurrency.format(activity.amount)}
                </span>
              </div>
              <div className="d-flex align-items-center gap-1">
                <span className="fw-bold">
                  {t('modal.details.paymentDate')}
                  :
                </span>
                <span className="flex-grow-1">
                  {DateTime.fromISO(activity.date).toFormat(FORMAT_DATE_FULL)}
                </span>
              </div>
              <div className="d-flex align-items-center gap-1">
                <span className="fw-bold">
                  {t('modal.details.id')}
                  :
                </span>
                <span className="flex-grow-1">
                  {activity.id}
                </span>
              </div>
              <div className="d-flex align-items-center gap-1">
                <span className="fw-bold">
                  {t('modal.details.status')}
                  :
                </span>
                {activity.status && (
                  <span className="flex-grow-1">
                    {t(`modal.status.${activity.status}`)}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </DModal.Body>
    </DModal>
  );
}
