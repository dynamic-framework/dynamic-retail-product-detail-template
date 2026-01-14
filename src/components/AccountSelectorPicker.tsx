import { DIcon, DPopover } from '@dynamic-framework/ui-react';
import { useCallback, useState } from 'react';

import { AccountTypeConfig } from '../services/config';
import useAccountCallback from '../services/hooks/useAccountCallback';
import type { Account } from '../services/interface';
import { useAppSelector } from '../store/hooks';
import { getAccounts, getIsLoadingAccountList } from '../store/selectors';

import AccountSelectorLoader from './loaders/AccountSelectorLoader';

export default function AccountSelectorPicker() {
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
        <span>
          <DIcon
            hasCircle
            icon={AccountTypeConfig[selected.type].icon}
            color={AccountTypeConfig[selected.type].theme}
          />
        </span>
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
          <div className="d-flex align-items-center gap-4">
            <span>
              <DIcon
                hasCircle
                icon={AccountTypeConfig[selected.type].icon}
                color={AccountTypeConfig[selected.type].theme}
              />
            </span>
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
              className="d-flex align-items-center gap-4 hover:bg-gray-50 p-1"
            >
              <span>
                <DIcon
                  hasCircle
                  icon={AccountTypeConfig[selected.type].icon}
                  color={AccountTypeConfig[selected.type].theme}
                />
              </span>
              <div className="flex-1">
                <p className="mb-0 fw-semibold">{selected?.name}</p>
                <p className="text-muted mb-0">{selected?.accountNumber}</p>
              </div>
            </div>
          ))}
        </div>
      </DPopover>
    </div>
  );
}
