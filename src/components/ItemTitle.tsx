import { DIcon } from '@dynamic-framework/ui-react';
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
    <div className="d-flex flex-column align-items-center mb-3 my-lg-4">
      <small className="d-inline-flex gap-2 align-items-center">
        <DIcon
          icon="circle-fill"
          theme={freeze ? 'warning' : 'success'}
          size="8px"
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
