/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { DateTime } from 'luxon';
import classNames from 'classnames';
import {
  DButton,
  DModal,
  DModalBody,
  DModalHeader,
  ModalProps,
  useFormatCurrency,
} from '@dynamic-framework/ui-react';
import { useTranslation } from 'react-i18next';

import { FORMAT_DATE } from '../config/widgetConfig';

import type { ModalAvailablePayload } from '../interface';

export default function ActivityDetailModal(
  {
    payload: {
      activity,
    },
    closeModal,
  }: ModalProps<ModalAvailablePayload['activityDetail']>,
) {
  const formatCurrency = useFormatCurrency();
  const { t } = useTranslation();

  return (
    <DModal
      className="activity-detail-modal"
      name="modal"
      centered
    >
      <DModalHeader
        onClose={() => closeModal()}
        showCloseButton
      >
        <h5 className="fw-bold flex-grow-1 activity-name text-wrap">
          {activity.name}
        </h5>
      </DModalHeader>
      <DModalBody>
        <div className="d-flex flex-column gap-6">
          <div className="bg-light rounded-1 p-4">
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
                  {DateTime.fromISO(activity.date).toFormat(FORMAT_DATE)}
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
          <div className="d-flex justify-content-center">
            <DButton
              text={t('modal.actions.accept')}
              onClick={() => closeModal()}
            />
          </div>
        </div>
      </DModalBody>
    </DModal>
  );
}
