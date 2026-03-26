import {
  DCreditCard, DIcon, DPopover,
} from '@dynamic-framework/ui-react';
import { useCallback, useState } from 'react';

import useAccountCallback from '../services/hooks/useAccountCallback';
import type { Account } from '../services/interface';
import { useAppSelector } from '../store/hooks';
import { getAccounts, getIsLoadingAccountList } from '../store/selectors';

import AccountSelectorLoader from './loaders/AccountSelectorLoader';

export default function AccountSelectorResponsive() {
  const [toggle, setToggle] = useState(false);
  const loading = useAppSelector(getIsLoadingAccountList);
  const accounts = useAppSelector(getAccounts);
  const {
    callback,
    selected,
  } = useAccountCallback();

  const handleSelect = useCallback(async (account: Account) => {
    setToggle(false);
    await callback(account);
  }, [callback]);

  if (loading || !selected) {
    return <AccountSelectorLoader />;
  }

  if (accounts.length === 1) {
    return (
      <div className="d-flex align-items-center gap-4">
        <DCreditCard className="no-info" />
        <div className="flex-1">
          <p className="mb-0 fw-semibold">{selected?.name}</p>
          <p className="text-muted mb-0">{selected?.accountNumber}</p>
        </div>
        <div>
          <DIcon
            icon={toggle ? 'ChevronUp' : 'ChevronDown'}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="account-selector">
      <DPopover
        open={toggle}
        setOpen={setToggle}
        adjustContentToRender
        renderComponent={() => (
          <div className="d-flex align-items-center gap-4 border rounded p-2 mb-4">
            <DCreditCard className="no-info" />
            <div className="flex-1">
              <p className="mb-0 fw-semibold">{selected?.name}</p>
              <p className="text-muted mb-0">{selected?.accountNumber}</p>
            </div>
            <div>
              <DIcon
                icon={toggle ? 'ChevronUp' : 'ChevronDown'}
              />
            </div>
          </div>
        )}
      >
        <div className="rounded overflow-hidden drop-account">
          {accounts.map((account: Account) => (
            <div
              onClick={() => handleSelect(account)}
              role="button"
              tabIndex={0}
              onKeyDown={() => handleSelect(account)}
              key={account.id}
              className="d-flex align-items-center gap-4 hover:bg-gray-50 p-2"
            >
              <DCreditCard className="no-info" />
              <div className="flex-1">
                <p className="mb-0 fw-semibold">{account?.name}</p>
                <p className="text-muted mb-0">{account?.accountNumber}</p>
              </div>
            </div>
          ))}
        </div>
      </DPopover>
    </div>
  );
}
