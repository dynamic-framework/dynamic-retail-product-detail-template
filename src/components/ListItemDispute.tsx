/* eslint-disable react/jsx-props-no-spreading */
import {
  DCollapse,
  DListGroupItem,
  useFormatCurrency,
  DIcon,
} from '@dynamic-framework/ui-react';
import classNames from 'classnames';
import { DateTime } from 'luxon';
import { useMemo } from 'react';
import type { ComponentProps } from 'react';

import { FORMAT_DATE_FULL } from '../config/widgetConfig';
import { Dispute } from '../services/interface';

import DisputeDetailItem from './DisputeDetailItem';

type Props = Omit<ComponentProps<typeof DListGroupItem>, 'children'> & {
  dispute: Dispute;
};

export default function ListItemDispute(
  {
    dispute,
    ...props
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
      theme: '',
      valueFormatted,
    };
  }, [format, dispute.amount]);

  const header = (
    <div className="d-flex align-items-center w-100">
      <DIcon
        icon="MessageCircleWarning"
        strokeWidth={1}
        className="rounded bg-warning-50 p-2 me-3 text-warning-700"
      />
      <div className="d-flex flex-column">
        <span className="d-block text-capitalize fw-semibold">
          {dispute.name}
        </span>
        <small className="text-muted">
          {DateTime.fromISO(dispute.date).toFormat(FORMAT_DATE_FULL)}
        </small>
      </div>
      <span className={classNames('fs-6 ms-auto fw-semibold me-2', value.theme)}>
        {value.valueFormatted}
      </span>
    </div>
  );

  return (
    <DListGroupItem {...props}>
      <DCollapse
        className="w-100 border-0 rounded p-0 shadow-none hover:bg-primary-25"
        Component={header}
        defaultCollapsed
      >
        <div className="">
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
          <DisputeDetailItem i18nKey="modal.dispute.situation" />
          <DisputeDetailItem i18nKey="modal.dispute.description" />
          <DisputeDetailItem i18nKey="modal.dispute.state" />
        </div>
      </DCollapse>
    </DListGroupItem>
  );
}
