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
    <>
      <div className="d-flex justify-content-center mb-4 status-container">
        <small className="d-inline-flex gap-2 align-items-center">
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
      </div>
      <div className="d-flex flex-column align-items-center mb-3 total-balance">
        <small className="text-muted">
          {text}
        </small>
        {value && (
          <span className="fs-4 fw-semibold">
            {value}
          </span>
        )}
      </div>
    </>
  );
}
