/* eslint-disable react/jsx-props-no-spreading */
import {
  DButtonIcon,
  DListItem,
  useDPortalContext,
  useFormatCurrency,
} from '@dynamic-framework/ui-react';
import classNames from 'classnames';
import { DateTime } from 'luxon';
import { useMemo } from 'react';
import type { ComponentProps } from 'react';

import { FORMAT_DATE_FULL } from '../config/widgetConfig';
import { Dispute } from '../services/interface';

type Props = Omit<ComponentProps<typeof DListItem>, 'children'> & {
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
      theme: 'text-gray-500',
      valueFormatted,
    };
  }, [format, dispute.amount]);

  return (
    <DListItem
      {...props}
      className="border-light py-2 px-lg-4"
    >
      <div className="d-flex align-items-center py-1 gap-4">
        <div className="d-flex flex-column">
          <span className="fs-body-tiny">
            {dispute.id}
          </span>
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
        <DButtonIcon
          onClick={() => openPortal('modalDisputeDetail', { dispute })}
          icon="eye"
          variant="link"
        />
      </div>
    </DListItem>
  );
}
