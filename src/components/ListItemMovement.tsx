/* eslint-disable react/jsx-props-no-spreading */
import {
  DBadge,
  DCollapse,
  DIcon,
  DListGroupItem,
  useFormatCurrency,
} from '@dynamic-framework/ui-react';
import classNames from 'classnames';
import { useMemo } from 'react';
import type { ComponentProps } from 'react';
import { useTranslation } from 'react-i18next';

import { ActivityStatus } from '../services/config';

type Props = Omit<ComponentProps<typeof DListGroupItem>, 'children'> & {
  description: string;
  date: string;
  amount: number;
  id: string;
  status: ActivityStatus;
};

export default function ListItemMovement(
  {
    description,
    date,
    amount,
    id,
    status,
    ...props
  }: Props,
) {
  const { format } = useFormatCurrency();
  const { t } = useTranslation();

  const value = useMemo(() => {
    const valueFormatted = format(amount);
    if (amount > 0) {
      return {
        theme: 'text-success',
        valueFormatted: `+${valueFormatted}`,
      };
    }
    return {
      theme: '',
      valueFormatted,
    };
  }, [format, amount]);

  const header = (
    <div className="d-flex align-items-center w-100">
      <DIcon
        icon="ArrowLeftRight"
        strokeWidth={1}
        className="rounded bg-primary-50 p-2 me-3 text-primary-700"
      />
      <div className="d-flex flex-column">
        <span className="transaction-name fs-6 fw-semibold">
          {description}
        </span>
        <span className="small text-muted">
          {date}
        </span>
      </div>
      <span className={classNames('fs-6 ms-auto fw-semibold me-2', value.theme)}>
        {value.valueFormatted}
      </span>
    </div>
  );

  return (
    <DListGroupItem {...props}>
      <DCollapse
        className="w-100 border-0 rounded shadow-none hover:bg-primary-25"
        Component={header}
        defaultCollapsed
      >
        <div className="d-flex flex-column gap-2 py-2">
          <div className="d-flex align-items-center justify-content-between">
            <span className="fw-semibold">
              {t('modal.details.id')}
              :
            </span>
            <span className="text-muted">{id}</span>
          </div>
          <div className="d-flex align-items-center justify-content-between">
            <span className="fw-semibold">
              {t('modal.details.status')}
              :
            </span>
            <DBadge
              soft
              color={status === ActivityStatus.Completed ? 'success' : 'danger'}
              text={t(`modal.status.${status}`)}
            />
          </div>
        </div>
      </DCollapse>
    </DListGroupItem>
  );
}
