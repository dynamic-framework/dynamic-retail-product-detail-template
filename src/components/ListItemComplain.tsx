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
import { Activity } from '../services/interface';

type Props = Omit<ComponentProps<typeof DListItem>, 'children'> & {
  activity: Activity;
};

export default function ListItemComplain(
  {
    activity,
    style,
    className,
    ...props
  }: Props,
) {
  const { format } = useFormatCurrency();
  const { openPortal } = useDPortalContext();
  const value = useMemo(() => {
    const valueFormatted = format(activity.amount);
    if (activity.amount > 0) {
      return {
        theme: 'text-success',
        valueFormatted,
      };
    }
    return {
      theme: 'text-gray-500',
      valueFormatted,
    };
  }, [format, activity.amount]);

  return (
    <DListItem {...props} className="border-light py-1">
      <div className="d-flex align-items-center py-1 gap-4">
        <div className="d-flex flex-column">
          <span className="fs-body-tiny">
            {activity.id}
          </span>
          <span className="d-block text-capitalize">
            {activity.name}
          </span>
          <small>
            {DateTime.fromISO(activity.date).toFormat(FORMAT_DATE_FULL)}
          </small>
        </div>
        <span className={classNames('fs-6 ms-auto', value.theme)}>
          {value.valueFormatted}
        </span>
        <DButtonIcon
          onClick={() => openPortal('modalComplainDetail', { activity })}
          icon="eye"
          variant="link"
        />
      </div>
    </DListItem>
  );
}
