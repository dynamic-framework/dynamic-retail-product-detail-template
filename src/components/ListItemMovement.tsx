/* eslint-disable react/jsx-props-no-spreading */
import { useMemo } from 'react';
import classNames from 'classnames';

import type { ComponentProps } from 'react';

import { DListItem, useFormatCurrency } from '@dynamic-framework/ui-react';

type Props = Omit<ComponentProps<typeof DListItem>, 'children'> & {
  description: string;
  date: string;
  amount: number;
};

export default function ListItemMovement(
  {
    description,
    date,
    amount,
    className,
    style,
    ...props
  }: Props,
) {
  const { format } = useFormatCurrency();
  const value = useMemo(() => {
    const valueFormatted = format(amount);
    if (amount > 0) {
      return {
        theme: 'text-success',
        valueFormatted,
      };
    }
    return {
      theme: 'text-danger',
      valueFormatted,
    };
  }, [format, amount]);

  return (
    <DListItem {...props}>
      <div className="d-flex justify-content-between align-items-center p-3 gap-3">
        <div className="d-flex flex-column gap-1">
          <span className="fs-6">
            {description}
          </span>
          <span className="small text-gray-700">
            {date}
          </span>
        </div>
        <span className={classNames('fs-6', value.theme)}>
          {value.valueFormatted}
        </span>
      </div>
    </DListItem>
  );
}
