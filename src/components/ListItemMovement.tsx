/* eslint-disable react/jsx-props-no-spreading */
import {
  DCollapse,
  useFormatCurrency,
  DBadge,
} from '@dynamic-framework/ui-react';
import classNames from 'classnames';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { STATUS } from '../config/widgetConfig';
import { Activity } from '../services/interface';

type Props = {
  activity: Activity;
  date: string;
};

export default function ListItemMovement(
  {
    activity,
    date,
  }: Props,
) {
  const { name, amount } = activity;
  const { format } = useFormatCurrency();
  const { t } = useTranslation();
  const value = useMemo(() => {
    const valueFormatted = format(amount);
    if (amount > 0) {
      return {
        theme: 'text-success',
        valueFormatted,
      };
    }
    return {
      theme: 'text-gray-800',
      valueFormatted,
    };
  }, [format, amount]);

  return (
    <DCollapse
      className="border-bottom rounded-0 shadow-none hover-bg-gray-25"
      Component={(
        <div className="d-flex align-items-center py-1 gap-4">
          <div className="d-flex flex-column">
            <span className="transaction-name fs-6">
              {name}
            </span>
            <span className="small text-muted">
              {date}
            </span>
          </div>
          <span className={classNames('fs-6 ms-auto fw-bold', value.theme)}>
            {value.valueFormatted}
          </span>
        </div>
        )}
    >
      <div className="py-1 gap-4 small">
        <p className="mb-1">
          Name:
          {name}
        </p>
        <p className="mb-1">
          Date:
          {date}
        </p>
        <p className="mb-1">
          Amount:
          {format(amount)}
        </p>
        {activity.status && (
          <DBadge
            soft
            theme={STATUS[activity.status as keyof typeof STATUS]}
            text={t(`modal.status.${activity.status}`)}
          />
        )}
      </div>
    </DCollapse>
  );
}
