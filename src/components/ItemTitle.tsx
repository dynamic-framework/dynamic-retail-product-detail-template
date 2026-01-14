import classNames from 'classnames';
import { useMemo } from 'react';

import { useAppSelector } from '../store/hooks';
import { getAccountsFreezed } from '../store/selectors';

type Props = {
  text: string;
  value?: string | number;
  accountId?: string;
};

export default function ItemTitle(
  {
    text,
    value,
    accountId,
  }: Props,
) {
  const accountsFreezed = useAppSelector(getAccountsFreezed);

  const freeze = useMemo(
    () => (accountId ? accountsFreezed[accountId] : false),
    [accountId, accountsFreezed],
  );

  return (
    <div className="d-flex flex-column align-items-center mb-3">
      <small className="d-inline-flex gap-2 align-items-center mb-4">
        <span
          style={{
            width: 15,
            height: 15,
          }}
          className={classNames(
            freeze ? 'bg-warning-500' : 'bg-success-500',
            'rounded-pill',
          )}
        />
        <span>{freeze ? 'Freeze' : 'Active'}</span>
      </small>
      <small className="text-gray-700">
        {text}
      </small>
      {value && (
        <span className="fs-4">
          {value}
        </span>
      )}
    </div>
  );
}
