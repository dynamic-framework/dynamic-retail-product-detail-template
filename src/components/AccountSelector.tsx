import { useCallback, useState } from 'react';
import { MPopover, MQuickActionButton } from '@dynamic-framework/ui-react';

import AccountSelectorLoader from './loaders/AccountSelectorLoader';
import useAccountCallback from '../services/hooks/useAccountCallback';
import { AccountTypeConfig } from '../services/config';
import { useAppSelector } from '../store/hooks';
import { getAccounts } from '../store/selectors';

import type { Account } from '../services/interface';

export default function AccountSelector() {
  const [toggle, setToggle] = useState(false);
  const accounts = useAppSelector(getAccounts);
  const {
    loading,
    selected,
    callback,
  } = useAccountCallback();

  const handlerSelect = useCallback(async (account: Account) => {
    if (selected && selected.id !== account.id) {
      await callback(account.baseType, account.id);
    }
    setToggle(false);
  }, [callback, selected]);

  if (loading) {
    return <AccountSelectorLoader />;
  }

  if (accounts.length === 1) {
    return (
      <MQuickActionButton
        line1={selected.alias ?? selected.name}
        line2={`N° ${selected.accountNumber}`}
        className="selected-product position-relative"
        representativeIcon={AccountTypeConfig[selected.type].icon}
        representativeIconTheme={AccountTypeConfig[selected.type].theme}
        representativeIconHasCircle
        actionIcon="" // TODO: Remove html element if is undefined - DS
      />
    );
  }

  return (
    <div className="product-selector">
      <MPopover
        isOpen={toggle}
        setIsOpen={setToggle}
        renderComponent={() => (
          <MQuickActionButton
            line1={selected.alias ?? selected.name}
            line2={`N° ${selected.accountNumber}`}
            className="selected-product position-relative"
            representativeIcon={AccountTypeConfig[selected.type].icon}
            representativeIconTheme={AccountTypeConfig[selected.type].theme}
            representativeIconHasCircle
            actionIcon={toggle ? 'chevron-up' : 'chevron-down'}
          />
        )}
      >
        <div className="rounded overflow-hidden drop-product">
          {accounts.map((account: Account) => (
            <MQuickActionButton
              key={account.id}
              line1={account.alias ?? account.name}
              line2={`N° ${account.accountNumber}`}
              className={selected.id === account.id ? 'selected' : undefined}
              representativeIcon={AccountTypeConfig[selected.type].icon}
              representativeIconTheme={AccountTypeConfig[selected.type].theme}
              representativeIconHasCircle
              actionIcon=""
              onMClick={() => handlerSelect(account)}
            />
          ))}
        </div>
      </MPopover>
    </div>
  );
}
