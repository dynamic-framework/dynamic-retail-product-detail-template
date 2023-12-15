import { useCallback, useState } from 'react';
import { DPopover, DQuickActionButton } from '@dynamic-framework/ui-react';

import AccountSelectorLoader from './loaders/AccountSelectorLoader';
import useAccountCallback from '../services/hooks/useAccountCallback';
import { AccountTypeConfig } from '../services/config';
import { useAppSelector } from '../store/hooks';
import { getAccounts, getIsLoadingAccountList } from '../store/selectors';

import type { Account } from '../services/interface';

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
      <DQuickActionButton
        line1={selected.alias ?? selected.name}
        line2={`N° ${selected.accountNumber}`}
        className="selected-account position-relative"
        representativeIcon={AccountTypeConfig[selected.type].icon}
        representativeIconTheme={AccountTypeConfig[selected.type].theme}
        representativeIconHasCircle
      />
    );
  }

  return (
    <div className="account-selector">
      <DPopover
        open={toggle}
        setOpen={setToggle}
        adjustContentToRender
        renderComponent={() => (
          <DQuickActionButton
            line1={selected?.alias ?? selected?.name}
            line2={`N° ${selected?.accountNumber}`}
            className="selected-account position-relative"
            representativeIcon={AccountTypeConfig[selected.type].icon}
            representativeIconTheme={AccountTypeConfig[selected.type].theme}
            representativeIconHasCircle
            actionIcon={toggle ? 'chevron-up' : 'chevron-down'}
          />
        )}
      >
        <div className="rounded overflow-hidden drop-account">
          {accounts.map((account: Account) => (
            <DQuickActionButton
              key={account.id}
              line1={account.alias ?? account.name}
              line2={`N° ${account.accountNumber}`}
              className={selected?.id === account.id ? 'selected' : undefined}
              representativeIcon={AccountTypeConfig[account.type].icon}
              representativeIconTheme={AccountTypeConfig[account.type].theme}
              representativeIconHasCircle
              actionIcon=""
              onClick={() => handleSelect(account)}
            />
          ))}
        </div>
      </DPopover>
    </div>
  );
}
