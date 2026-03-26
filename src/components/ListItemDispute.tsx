/* eslint-disable react/jsx-props-no-spreading */
import {
  DButtonIcon,
  DListGroupItem,
  useDPortalContext,
  useFormatCurrency,
} from '@dynamic-framework/ui-react';
import classNames from 'classnames';
import { DateTime } from 'luxon';
import { useMemo } from 'react';
import type { ComponentProps } from 'react';

import { FORMAT_DATE_FULL } from '../config/widgetConfig';
import { Dispute } from '../services/interface';

type Props = Omit<ComponentProps<typeof DListGroupItem>, 'children'> & {
  dispute: Dispute;
};

export default function ListItemDispute(
  {
    dispute,
    style,
    className,
    ...props
  }: Props,
) {
  const { format } = useFormatCurrency();
  const { openPortal } = useDPortalContext();
  const value = useMemo(() => {
    const valueFormatted = format(dispute.amount);
    if (dispute.amount > 0) {
      return {
        theme: 'text-success',
        valueFormatted,
      };
    }
    return {
      theme: 'text-gray-700',
      valueFormatted,
    };
  }, [format, dispute.amount]);

  return (
    <DListGroupItem
      {...props}
    >
      <>
        <div className="d-flex flex-column">
          <span className="small text-muted">
            {dispute.id}
          </span>
          <span className="d-block text-capitalize fw-semibold">
            {dispute.name}
          </span>
          <small>
            {DateTime.fromISO(dispute.date).toFormat(FORMAT_DATE_FULL)}
          </small>
        </div>
        <span className={classNames('fs-6 ms-auto fw-semibold', value.theme)}>
          {value.valueFormatted}
        </span>
        <DButtonIcon
          onClick={() => openPortal('modalDisputeDetail', { dispute })}
          icon="Eye"
          variant="link"
        />
      </>
    </DListGroupItem>
  );
}
