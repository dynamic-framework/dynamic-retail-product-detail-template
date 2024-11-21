/* eslint-disable react/jsx-props-no-spreading */
import {
  DButtonIcon,
  DListItem,
  useFormatCurrency,
} from '@dynamic-framework/ui-react';
import classNames from 'classnames';
import { useMemo } from 'react';
import type { ComponentProps } from 'react';

type Props = Omit<ComponentProps<typeof DListItem>, 'children'> & {
  description: string;
  date: string;
  amount: number;
  openModal?: () => void;
};

export default function ListItemMovement(
  {
    description,
    date,
    amount,
    style,
    openModal,
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
      theme: 'text-gray-500',
      valueFormatted,
    };
  }, [format, amount]);

  return (
    <DListItem {...props}>
      <div className="d-flex align-items-center py-1 gap-4">
        <div className="d-flex flex-column">
          <span className="transaction-name fs-6">
            {description}
          </span>
          <span className="small text-gray-700">
            {date}
          </span>
        </div>
        <span className={classNames('fs-6 ms-auto', value.theme)}>
          {value.valueFormatted}
        </span>
        <DButtonIcon
          onClick={openModal}
          icon="eye"
          variant="link"
        />
      </div>
    </DListItem>
  );
}
