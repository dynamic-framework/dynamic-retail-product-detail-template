/* eslint-disable react/jsx-props-no-spreading */
import {
  DCollapse,
  useFormatCurrency,
} from '@dynamic-framework/ui-react';
import classNames from 'classnames';
import { DateTime } from 'luxon';
import { useMemo } from 'react';

import { FORMAT_DATE_FULL } from '../config/widgetConfig';
import { Dispute } from '../services/interface';

import DisputeDetailItem from './DisputeDetailItem';

type Props = {
  dispute: Dispute;
};

export default function ListItemDispute(
  {
    dispute,
  }: Props,
) {
  const { format } = useFormatCurrency();
  const value = useMemo(() => {
    const valueFormatted = format(dispute.amount);
    if (dispute.amount > 0) {
      return {
        theme: 'text-success',
        valueFormatted,
      };
    }
    return {
      theme: 'text-gray-500',
      valueFormatted,
    };
  }, [format, dispute.amount]);

  return (
    <DCollapse
      className="border-bottom rounded-0 shadow-none hover-bg-gray-25"
      Component={(
        <div className="d-flex align-items-center py-1 gap-4">
          <div className="d-flex flex-column">
            <small className="text-muted">
              {dispute.id}
            </small>
            <span className="d-block text-capitalize">
              {dispute.name}
            </span>
            <small>
              {DateTime.fromISO(dispute.date).toFormat(FORMAT_DATE_FULL)}
            </small>
          </div>
          <span className={classNames('fs-6 ms-auto', value.theme)}>
            {value.valueFormatted}
          </span>
        </div>
        )}
    >
      <div className="py-1 gap-4 small">
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
      </div>
    </DCollapse>
  );
}
