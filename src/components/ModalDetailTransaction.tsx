/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { DateTime } from 'luxon';

import {
  MButton,
  MModal,
  ModalProps,
  useFormatCurrency,
} from '@modyo-dynamic/modyo-design-system-react';
import type { TransactionStatus } from '@modyo-dynamic/modyo-service-retail';

import { useTranslation } from 'react-i18next';
import { FORMAT_DATE } from '../config/widgetConfig';

export default function ModalDetailTransaction(
  {
    payload: {
      transaction,
    },
    closeModal,
  }: ModalProps,
) {
  const formatCurrency = useFormatCurrency();
  const { t } = useTranslation();

  return (
    <MModal
      className="modal-detail-transaction"
      name="modal"
      isCentered
      onMClose={() => closeModal()}
      showCloseButton
    >
      <div slot="body">
        <div className="d-flex flex-column gap-4">
          <h5 className="fw-bold flex-grow-1 transaction-name text-wrap">
            {transaction.name}
          </h5>
          <div className="bg-light rounded-1 p-3">
            <div className="d-flex flex-column gap-1">
              <div className="d-flex align-items-center gap-1">
                <span className="fw-bold">
                  {t('modal.details.value')}
                  :
                </span>
                <span className={`flex-grow-1
              ${transaction.amount > 0 ? 'text-success' : 'text-danger'}`}
                >
                  {formatCurrency.format(transaction.amount as number)}
                </span>
              </div>
              <div className="d-flex align-items-center gap-1">
                <span className="fw-bold">
                  {t('modal.details.paymentDate')}
                  :
                </span>
                <span className="flex-grow-1">
                  {DateTime.fromISO(transaction.date as string).toFormat(FORMAT_DATE)}
                </span>
              </div>
              <div className="d-flex align-items-center gap-1">
                <span className="fw-bold">
                  {t('modal.details.status')}
                  :
                </span>
                {transaction.status && (
                  <span className="flex-grow-1">
                    {t(`modal.status.${transaction.status as TransactionStatus}`)}
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-center">
            <MButton
              text={t('modal.actions.accept')}
              onMClick={() => closeModal()}
              isPill
            />
          </div>
        </div>
      </div>
    </MModal>
  );
}
