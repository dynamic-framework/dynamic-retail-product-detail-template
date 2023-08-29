import {
  useCallback,
  useMemo,
} from 'react';
import {
  MCarousel,
  MCarouselSlide,
} from '@dynamic-framework/ui-react';

import AccountSelectorLoader from './loaders/AccountSelectorLoader';
import useAccountCallback from '../services/hooks/useAccountCallback';
import { useAppSelector } from '../store/hooks';
import { getAccounts } from '../store/selectors';

import type { Account } from '../services/interface';
import AccountCard from './AccountCard';
import { AccountTypeConfig } from '../services/config';

export default function AccountSlider() {
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
  }, [callback, selected]);

  const currentAccountIndex = useMemo(() => {
    if (accounts && selected) {
      // eslint-disable-next-line no-plusplus
      for (let index = 0; index < accounts.length; index++) {
        if (accounts[index].id === selected.id) {
          return index;
        }
      }
    }
    return 0;
  }, [accounts, selected]);

  if (loading) {
    return <AccountSelectorLoader />;
  }

  if (accounts.length === 1) {
    return (
      <AccountCard
        account={selected}
        background={AccountTypeConfig[selected.type].theme}
      />
    );
  }

  return (
    <div className="account-selector">
      <MCarousel
        options={{
          arrows: true,
          padding: 0,
          gap: 16,
          start: currentAccountIndex,
          updateOnMove: true,
          rewind: true,
        }}
        onMoved={(_, index) => handlerSelect(accounts[index])}
      >
        {accounts.map((account: Account) => (
          <MCarouselSlide
            key={account.id}
          >
            <AccountCard
              account={account}
              background={AccountTypeConfig[selected.type].theme}
            />
          </MCarouselSlide>
        ))}
      </MCarousel>
    </div>
  );
}
